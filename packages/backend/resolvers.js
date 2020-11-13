import fetch from 'node-fetch'
import scalars from './scalars'
import { satelliteIds, fakePositions, fakeSatellites } from './constants'

async function getSatelliteInfo({ id }) {
  const getTleResponse = await fetch(
    `${process.env.API_ENDPOINT}/tle/${id}/&apiKey=${process.env.API_KEY}`,
  )
  const data = await getTleResponse.json()
  return data
}

async function getPosition({ id, observerLat, observerLng, observerAlt }) {
  const getPositionResponse = await fetch(
    `${process.env.API_ENDPOINT}/positions/${id}/${observerLat}/${observerLng}/${observerAlt}/1/&apiKey=${process.env.API_KEY}`,
  )
  const data = await getPositionResponse.json()

  const { info, positions } = data

  return {
    info,
    positions,
  }
}

const resolvers = {
  ...scalars,
  Query: {
    async satellite(_, args) {
      const { id } = args
      return getSatelliteInfo({ id })
    },
    async allSatellites() {
      //return satelliteIds.map(async id => getSatelliteInfo({ id }))
      return fakeSatellites
    },
    async allPositions(_, args) {
      const { ids, observerLat, observerLng, observerAlt } = args
      /*return ids.map(async id =>
        getPosition({ id, observerLat, observerLng, observerAlt }),
      )*/

      return fakePositions
    },
    async position(_, args) {
      const { id, observerLat, observerLng, observerAlt } = args
      return getPosition({ id, observerLat, observerLng, observerAlt })
    },
  },
  SatelliteInfo: {
    id(obj) {
      return obj.info.satid
    },
    name(obj) {
      return obj.info.satname
    },
    meanMotion(obj) {
      const line2 = obj.tle.split('\n')[1]
      const meanMotion = line2.split('').slice(52, 63).join('')
      return meanMotion
    },
  },
  SatellitePosition: {
    id(obj) {
      return obj.info.satid
    },
    name(obj) {
      return obj.info.satname
    },
    time(obj) {
      return obj.positions[0].timestamp * 1000
    }, // multiply response timestamp to convert to js timestamp

    lat(obj) {
      return obj.positions[0].satlatitude
    },
    lng(obj) {
      return obj.positions[0].satlongitude
    },
    alt(obj) {
      return obj.positions[0].sataltitude
    },
  },
}

export default resolvers
