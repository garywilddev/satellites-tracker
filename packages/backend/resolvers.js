import fetch from 'node-fetch'
import scalars from './scalars'

const satelliteIds = [
  '43567',
  '43566',
  '43565',
  /*'43564',
  '43058',
  '43057',
  '43056',
  '43055',
  '41862',
  '41861',
  '41860',
  '41859',
  '41550',
  '41549',
  '41175',
  '41174',
  '40890',
  '40129',
  '40128',
  '38858',
  '38857',
  '37847',
  '37846',*/
]

async function getPosition({ id, observerLat, observerLng, observerAlt }) {
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
    info,
    positions: [position],
  } = data

  return {
    id,
    name: info.satname,
    time: position.timestamp * 1000, // multiply response timestamp to convert to js timestamp
    lat: position.satlatitude,
    lng: position.satlongitude,
    alt: position.sataltitude,
  }
}

const resolvers = {
  ...scalars,
  Query: {
    async fakePositions(_, args) {
      return [
        {
          id: '43567',
          name: 'GALILEO 24 (2C0)',
          time: '2020-11-12T14:41:37.000Z',
          lat: -19.3212498,
          lng: 111.23114727,
          alt: 23225.05,
        },
        {
          id: '43566',
          name: 'GALILEO 23 (2C9)',
          time: '2020-11-12T14:41:37.000Z',
          lat: 51.18145929,
          lng: -109.52428061,
          alt: 23239.05,
        },
        {
          id: '43565',
          name: 'GALILEO 26 (2C2)',
          time: '2020-11-12T14:41:37.000Z',
          lat: -50.48320064,
          lng: -3.54470589,
          alt: 23227.53,
        },
      ]
    },
    async allPositions(_, args) {
      const { observerLat, observerLng, observerAlt } = args
      const positions = await Promise.all(
        satelliteIds.map(async id =>
          getPosition({ id, observerLat, observerLng, observerAlt }),
        ),
      )

      return positions
    },
    async position(_, args) {
      const { id, observerLat, observerLng, observerAlt } = args
      return getPosition({ id, observerLat, observerLng, observerAlt })
    },
  },
}

export default resolvers
