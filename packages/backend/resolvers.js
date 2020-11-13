import fetch from 'node-fetch'
import scalars from './scalars'

const satelliteIds = [
  '43567',
  '43566',
  '43565',
  '43564',
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
  '37846',
]

const satellites = [
  {
    info: {
      satid: 43566,
      satname: 'GALILEO 23 (2C9)',
      transactionscount: 621,
    },
    tle:
      '1 43566U 18060C   20316.25704086 -.00000075 +00000+0 +00000+0 0  9994\r\n2 43566  56.9008  37.0365 0004314 254.1158 105.8652  1.70476003014343',
  },
  {
    info: {
      satid: 41861,
      satname: 'GALILEO 17 (26D)',
      transactionscount: 621,
    },
    tle:
      '1 41861U 16069C   20316.89433563 +.00000093 +00000+0 +00000+0 0  9995\r\n2 41861  54.6740 157.7509 0001153 277.5719  82.5063  1.70473233024820',
  },
  {
    info: {
      satid: 37847,
      satname: 'GALILEO-FM2',
      transactionscount: 621,
    },
    tle:
      '1 37847U 11060B   20315.52145200 -.00000072 +00000+0 +00000+0 0  9995\r\n2 37847  56.7183  37.2758 0003405 289.3628  69.6130  1.70475300056264',
  },
  {
    info: {
      satid: 43564,
      satname: 'GALILEO 25 (2C1)',
      transactionscount: 621,
    },
    tle:
      '1 43564U 18060A   20316.98998697 -.00000077 +00000+0 +00000+0 0  9997\r\n2 43564  56.8985  37.0151 0004960 254.6572 105.3168  1.70476095014336',
  },

  {
    info: {
      satid: 43056,
      satname: 'GALILEO 20 (2C6)',
      transactionscount: 621,
    },
    tle:
      '1 43056U 17079B   20316.06404454 -.00000014 +00000+0 +00000+0 0  9995\r\n2 43056  56.1593 277.7718 0005804 279.2859  80.6274  1.70473678018152',
  },
  {
    info: {
      satid: 41175,
      satname: 'GALILEO 11 (268)',
      transactionscount: 621,
    },
    tle:
      '1 41175U 15079B   20316.01551400 +.00000092 +00000+0 +00000+0 0  9997\r\n2 41175  55.0136 157.4457 0002333 354.9222   5.1649  1.70473071030515',
  },
  {
    info: {
      satid: 43565,
      satname: 'GALILEO 26 (2C2)',
      transactionscount: 621,
    },
    tle:
      '1 43565U 18060B   20317.20983391 -.00000078 +00000+0 +00000+0 0  9990\r\n2 43565  56.9010  37.0087 0004468 260.4597  99.5189  1.70476134014386',
  },
  {
    info: {
      satid: 41549,
      satname: 'GALILEO 14 (26B)',
      transactionscount: 621,
    },
    tle:
      '1 41549U 16030A   20314.96339510 -.00000006 +00000+0 +00000+0 0  9994\r\n2 41549  56.1850 277.9609 0005006 306.6493  53.2892  1.70474414027800',
  },
  {
    info: {
      satid: 38857,
      satname: 'GALILEO-FM3',
      transactionscount: 621,
    },
    tle:
      '1 38857U 12055A   20316.22687683 +.00000092 +00000+0 +00000+0 0  9997\r\n2 38857  55.0002 157.7418 0001078 245.3862 114.6928  1.70473733050319',
  },
]

async function getSatelliteInfo({ id }) {
  const getTleResponse = await fetch(
    `${process.env.API_ENDPOINT}/tle/${id}/&apiKey=${process.env.API_KEY}`,
  )
  const data = await getTleResponse.json()
  console.log(JSON.stringify(data, null, 2))

  /*const data = {
    info: {
      satid: 43567,
      satname: 'GALILEO 24 (2C0)',
      transactionscount: 49,
    },
    tle:
      '1 43567U 18060D   20317.06350832 -.00000077 +00000+0 +00000+0 0  9993\r\n2 43567  56.9012  37.0153 0004423 255.7756 104.2041  1.70475736014343',
  }*/
  return data
}

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
    info,
    position,
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
      return satellites
    },
    async fakePositions() {
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
      const { ids, observerLat, observerLng, observerAlt } = args
      return ids.map(async id =>
        getPosition({ id, observerLat, observerLng, observerAlt }),
      )
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
      return obj.position.timestamp * 1000
    }, // multiply response timestamp to convert to js timestamp

    lat(obj) {
      return obj.position.satlatitude
    },
    lng(obj) {
      return obj.position.satlongitude
    },
    alt(obj) {
      return obj.position.sataltitude
    },
  },
}

export default resolvers
