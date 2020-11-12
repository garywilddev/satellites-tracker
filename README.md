# Satellites Tracker

The project goal is to provide a nice user interface and developper API to display the position of multiple satellites.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

To get the app running you will need the following programs installed on your computer:

* node 12.14.0 (^12.14.0) with npm 6.14.8
* docker-compose version 1.25.5
* Docker version 19.03.11

### Install

This project uses lerna to manage multiple sub-packages

1. Install the dependencies of the top packages

```
$ npm i
```

2. Install the dependencies in the sub-packages and build the front application

```
$ npm run build
```

3. Then run the docker containers

```
$ docker-compose -d up --build
```

4. Browser to http://localhost:8080 to access the app

### Run the app for development

1. Start the app with pm2

```
$ npm run dev:start
```

2. Stop

```
$ npm run dev:stop
```

### Run the style check

```
npm run check
```

## Authors

* **Gary Sauvage** - *Initial work* - [garywilddev](https://github.com/garywilddev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
