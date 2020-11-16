import fetch from 'node-fetch'
import scalars from './scalars'
import { fakeSatellites } from './constants'

async function getSatelliteInfo({ id }) {
  const getTleResponse = await fetch(
    `${process.env.API_ENDPOINT}/tle/${id}/&apiKey=${process.env.API_KEY}`,
  )
  const data = await getTleResponse.json()
  if (data.error) {
    throw new Error(`Error while fetching positions: ${data.error}`)
  }

  return data
}

function ny2oPositionInfo2Positions(ny2oPositionInfo) {
  const { info, positions } = ny2oPositionInfo

  return positions.map(position => ({
    ...position,
    timestamp: new Date(position.timestamp * 1000),
    ...info,
  }))
}

async function fetchNextPositions({
  id,
  observerLat,
  observerLng,
  observerAlt,
}) {
  const getPositionResponse = await fetch(
    `${process.env.API_ENDPOINT}/positions/${id}/${observerLat}/${observerLng}/${observerAlt}/300/&apiKey=${process.env.API_KEY}`,
  )
  const ny2oPositionInfo = await getPositionResponse.json()

  if (ny2oPositionInfo.error) {
    throw new Error(`Error while fetching positions: ${ny2oPositionInfo.error}`)
  }

  return ny2oPositionInfo2Positions(ny2oPositionInfo)
}

async function findNextPositionInDb(id, context) {
  const { Position } = context
  const date = new Date()
  const arr = await Position.find({
    satid: id,
    timestamp: { $gte: date, $lt: new Date(date.valueOf() + 1000) },
  })
  return arr[0]
}

async function writePositionsInDb(positions, context) {
  const { Position } = context
  return Position.collection.insertMany(positions)
}

const resolvers = {
  ...scalars,
  Query: {
    async satellite(_, args) {
      const { id } = args
      return getSatelliteInfo({ id })
    },
    async allSatellites() {
      // return satelliteIds.map(async id => getSatelliteInfo({ id }))
      return fakeSatellites
    },
    async allPositions(_, args, context) {
      const { ids, observerLat, observerLng, observerAlt } = args

      return ids.map(async id => {
        const cachedNextPosition = await findNextPositionInDb(id, context)

        if (!cachedNextPosition) {
          const nextPositions = await fetchNextPositions({
            id,
            observerLat,
            observerLng,
            observerAlt,
          })
          await writePositionsInDb(nextPositions, context)

          return nextPositions[0]
        }

        return cachedNextPosition
      })
    },
    async position(_, args) {
      const { id, observerLat, observerLng, observerAlt } = args
      return fetchNextPositions({ id, observerLat, observerLng, observerAlt })
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
      return obj.satid
    },
    name(obj) {
      return obj.satname
    },
    time(obj) {
      return obj.timestamp
    }, // multiply response timestamp to convert to js timestamp

    lat(obj) {
      return obj.satlatitude
    },
    lng(obj) {
      return obj.satlongitude
    },
    alt(obj) {
      return obj.sataltitude
    },
    azimuth(obj) {
      return obj.azimuth
    },
    elevation(obj) {
      return obj.elevation
    },
    rightAscension(obj) {
      return obj.ra
    },
    declination(obj) {
      return obj.dec
    },
    eclipsed(obj) {
      return obj.eclipsed
    },
  },
}

export default resolvers
