import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar DateTime

  type SatelliteInfo {
    id: Int!
    name: String!
    tle: String!
    meanMotion: Float!
  }

  type SatellitePosition {
    id: Int!
    name: String!
    time: DateTime!
    lat: Float
    lng: Float
    alt: Float
  }

  type Query {
    satellite(id: Int!): SatelliteInfo!
    allSatellites: [SatelliteInfo]!
    fakePositions(
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): [SatellitePosition!]
    allPositions(
      ids: [Int!]!
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): [SatellitePosition!]
    position(
      id: Int!
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): SatellitePosition!
  }
`

export default typeDefs
