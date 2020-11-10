import fetch from 'node-fetch'
import scalars from './scalars'

const resolvers = {
  ...scalars,
  Query: {
    async position(_, args) {
      const { id, observerLat, observerLng, observerAlt } = args
      const getPositionResponse = await fetch(
        `${process.env.API_ENDPOINT}/positions/${id}/${observerLat}/${observerLng}/${observerAlt}/1/&apiKey=${process.env.API_KEY}`,
      )
      const data = await getPositionResponse.json()
      console.log(JSON.stringify(data, null, 2))

      /* const res = {
        info: {
          satname: 'GALILEO-FM3',
          satid: 38857,
          transactionscount: 1,
        },
        positions: [
          {
            satlatitude: -53.74653402,
            satlongitude: 147.84616856,
            sataltitude: 23239.12,
            azimuth: 115.78,
            elevation: -71.97,
            ra: 91.49220585,
            dec: -53.59115968,
            timestamp: 1605111846,
            eclipsed: false,
          },
        ],
      } */

      const {
        positions: [position],
      } = data

      return {
        id,
        time: position.timestamp * 1000, // multiply response timestamp to convert to js timestamp
        lat: position.satlatitude,
        lng: position.satlongitude,
        alt: position.sataltitude,
      }
    },
  },
}

export default resolvers
