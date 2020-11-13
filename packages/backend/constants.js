export const satelliteIds = [
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

export const fakeSatellites = [
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

export const fakePositions = [
  {
    info: {
      satname: 'GALILEO 17 (26D)',
      satid: 41861,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 10.05750616,
        satlongitude: -131.02242459,
        sataltitude: 23222.14,
        azimuth: 311.08,
        elevation: -29.07,
        ra: 159.19884121,
        dec: 0.78137657,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 23 (2C9)',
      satid: 43566,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 35.22873625,
        satlongitude: 128.37167833,
        sataltitude: 23235.79,
        azimuth: 41.68,
        elevation: -5.59,
        ra: 71.25370574,
        dec: 24.50807397,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 26 (2C2)',
      satid: 43565,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 1.1221132,
        satlongitude: -79.69830916,
        sataltitude: 23220.2,
        azimuth: 264.74,
        elevation: -6.25,
        ra: 207.80210494,
        dec: -8.05225344,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 11 (268)',
      satid: 41175,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: -9.59835589,
        satlongitude: 48.22424362,
        sataltitude: 23230.98,
        azimuth: 131.45,
        elevation: 6.69,
        ra: 350.44555897,
        dec: -20.27434424,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO-FM3',
      satid: 38857,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 46.33805036,
        satlongitude: -91.0993003,
        sataltitude: 23231.05,
        azimuth: 306.33,
        elevation: 19.46,
        ra: 193.1342021,
        dec: 38.30006297,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 25 (2C1)',
      satid: 43564,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: -37.36875359,
        satlongitude: 71.24987001,
        sataltitude: 23226.84,
        azimuth: 129.58,
        elevation: -26.68,
        ra: 17.05470073,
        dec: -45.57099752,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO-FM2',
      satid: 37847,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 37.10638076,
        satlongitude: -108.44275615,
        sataltitude: 23234.48,
        azimuth: 309.27,
        elevation: 3.15,
        ra: 178.33194534,
        dec: 27.32059495,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 14 (26B)',
      satid: 41549,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 47.55866925,
        satlongitude: 114.87947037,
        sataltitude: 23242.79,
        azimuth: 42.48,
        elevation: 10.43,
        ra: 60.65297864,
        dec: 37.78821145,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
  {
    info: {
      satname: 'GALILEO 20 (2C6)',
      satid: 43056,
      transactionscount: 153,
    },
    positions: [
      {
        satlatitude: 15.02486143,
        satlongitude: 151.37818266,
        sataltitude: 23229.91,
        azimuth: 31.99,
        elevation: -31.08,
        ra: 90.88015807,
        dec: 5.11303717,
        timestamp: 1605283850,
        eclipsed: false,
      },
    ],
  },
]
