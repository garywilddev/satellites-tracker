# Satellites Tracker

The project goal is to provide a nice user interface and developper API to display the position of multiple satellites.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

To get the app running you will need the following programs installed on your computer:

* node 12.14.0 (^12.14.0) with npm 6.14.8
* docker-compose (my version is 1.25.5)
* Docker (my version is 19.03.11)
* An API key for the [N2YO API](https://www.n2yo.com/api/)
* An API key for the Google [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key)

### Install

> This project uses lerna to manage multiple node sub-packages

To install the app and get it up and running follow these steps:


1. Install the dependencies of the root package

```
$ npm i
```

2. Set the keys for the N2YO API and the Google Maps API

    a. Make the script **replace_api_keys.sh** executable

    ```
    $ chmod +x ./replace_api_keys.sh
    ```

    b. call the script

    ```
    $ ./replace_api_keys.sh -a <N2YO_API_KEY> -g <GOOGLE_MAPS_API_KEY>
    ```


3. Install the dependencies in the sub-packages and build the docker images

```
$ npm run build
```

4. Then run the docker containers

```
$ npm run docker:start
```

5. Browser to http://localhost:8080 to access the app


### Run the app for development

1. Set the keys for the N2YO API and the Google Maps API

    a. Make the script **replace_api_keys.sh** executable

    ```
    $ chmod +x ./replace_api_keys.sh
    ```

    b. call the script

    ```
    $ ./replace_api_keys.sh -a <N2YO_API_KEY> -g <GOOGLE_MAPS_API_KEY>
    ```

2. Start the app

```
$ npm run dev:start
```

3. Stop the app

```
$ npm run dev:stop
```

### Run the style check

```
npm run verify
```

## User manual
The page contains 3 main components:
* *Data Table* containing useful data on the satellites being tracked.
* *Refresh Button* to get the freshest position information of the tracked satellites
* *Earth Map* that appears when position information are available to easily picture where the satellites are.

##### Data Table
* Satellites are sorted by mean motion (if we consider that the satellites have a circular constant speed orbit around earth, the mean motion is the angular speed of a satellite, thus is a good measure to sort out the satellites that revolve faster around the earth)
* Each table row represents a satellite and contains 2 kinds of data:
  * Constant or slow changing, info data: name, id, mean motion
  * Dynamic or fast changing, position data: latitude, longitude, altitude, azimuth, elevation,right ascension, declination and if the satellite is visible or not from the office.
* Once the position data are loaded and the map is visible. We can click on each table row to toggle the satellite position on the Earth Map
* This component is made quickly available to the user with the "constant" info fields of the satellite and it is updated with the position data after the Refresh Button is clicked.

#### Refresh Button
* It allows to get the freshest positions of the tracked satellites.

#### Earth Map
* Not visible on first page paint. It is only visible when position data are available
* It displays the positions of the satellites and the position of the office
* Position markers can be hovered to display satellite data
* A position is toggled when a row in the Data Table is selected.


## Dicussions
### Architecture decisions
* 3 docker containers:
#### Backend
  * 1 Node server running Apollo Server to expose a GraphQL API
  * 1 mongodb document store for persistency of backend side
#### FrontEnd
  * 1 Next.js server serving the front-end static pages and the react js code which uses Apollo Client

#### Static Site Generation of the constant satellite data:
I chose to use Next.js Static Site Generation (SSG) ability to generate the constant info of the Data Table in order serve faster static content about the satellites.

Pros:
* Easy to manage pagination
* The page already filled with contentful data on very first paint
* The first contentful paint of the page happens very soon after page request

Cons:
* SSG happens at Next.js app build and static data for SSG are retrieved via the Backend GraphQL API so the Backend must be running at build time of the front app.

##### Alternatives

1. Make a batch call to the API on first page load to fetch the satellites' constant data and caching the data in the front.

Pros:
* Easy to manage pagination

Cons:
* The call would have used server resources vainly, since the constant information don't change much.
* The api call to the N2YO via the Backend would have slowered every the first render of the page (not good for SEO)

---

2. Make one API call for each satellite on first page load to fetch the satellites' constant data and caching the data in the front.

Pros:
* Progressive apparation of the satellite data in the table
* Less wait to have the first paint than the 1st alternative

Cons:
* More calls to the API: N calls instead of one. It could be a problem when tracking millions of satellites.
* Harder to manage pagination than with one batch call per page.

---

3. Persist constant data in the back end (for example a routine that will populate the db with the info of tracked satellite data at server start)

Pros:
* Call to the GraphQL would be much faster than solution 1 as it doesnt involve call the N2YO API

Cons:
* We dont use the N2YO API as the only source of truth

#### Separate Front-End and Back-end packages
With Next.js I could have chosen to make both front end and back-end codebases live in the same place.
Indeed Next.js server can both serve the React JS front-end code and expose an API.
But the problem is that Next.js API is not available at build time of the front end part. And data during SSG are fetched via the API.


#### GraphQL API and Client
GraphQL allows to have a strongly typed and documented API out of the box.

Pros:
* Guided Architecture
* We dont have to write a lot of boilerplate code to perform sanity check of the client requests and server responses: clear errors when either of the client or the backend breaks the API contract.

Cons:
* Apollo GraphQL client is not supported out of the box by NextJS and I had to use code I don't fully master.

##### Alternatives
1. Call directly the N2YO API from the front-end app

Pros:
* Easy to set up

Cons:
* A lot of boiler plate code to check and format server response
* No clear error when client doesnt respect the API or when API contract is broken.

---

2. Set up and call a REST API

Cons:
* Brittle Design
* Boiler plate code


#### Server Side Caching Strategy
The N2YO API has a limitation on the number of call we can make per hours, but it allows to fetch at once one position per second for the at most 300 next seconds.
I chose to exploit this ability on the server side and persist the 300 next positions for each satellites in a MongoDB document store with a Time To Live Index.
If we have a document that matches the request timestamp in the databaseDB we return that document instead of call the N2YO API again.

Pros:
* The cache strategy is in the backend and not session specific so once the next 300 positions of a satellites are retrieved thay could be returned to any client requesting them.
The time overhead of the N2YO calls to fetch the satellites positions is paid once every 300s by only a unique API client.
* The cache invalidation is left to the MongoDB database via the TTL index.

Cons:
* The volume of stored data: We can ask ourselves if we really need to store the 300 next positions of each satellite. The granularity needed really depends on the usage.
If the lost engineer doesn't need a precision to the second, maybe we can store less data in the document store.
* The need to have a strategy about the dynamic of reads and writes in the document store when the API is requested by multiple users.

##### Alternatives
1. I could have cached data in the front-end
Pros:
* Easier to reason about and dedect bugs

Cons:
* It would have been one cache by client application and each client would have paid the time overhead of the API calls every 300s.

---

### Questions
> 1. How would you modify your project to handle horizontal scaling in such way we do not keep multiple copies of satellites data?

I think the Server Side Caching Strategy discussed before is a good way to avoid keeping multiples copies of satellites data in multiple client applications.

---

> 2. Imagine we do not track a dozen of satellites, but a million. How would you change your project to handle it?

I would have set a pagination and a filtering systems to conveniently retrieve a manageable subset of satellites

---

> 3. What metrics should be produced by your software? What would they be useful for? Propose an implementation using Prometheus protocol.
I would have monitored the following metrics:

* Number of client applications  
To know how many people are lost

* Number of requests by client application

* Http Errors rate  
To detect problems preventing the handling of incoming requests

* Average Response Time  
To detect performance issues in the processing of incoming requests (poorly optimized code, hanging connexion)

* CPU and memory usage on the production server  
Can help to better size the server ressources (up or down) and eventually detect performance issues.

---

> 4. Which assertion in the requirements and constraints is a scientific mistake, if any? This question won't give you any point.

We considered that the satellites have a circular constant speed orbit around earth. In fact most of the orbiting objects have an elliptic orbit which is not a constant speed motion.


## Authors

* **Gary Sauvage** - *Initial work* - [garywilddev](https://github.com/garywilddev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
