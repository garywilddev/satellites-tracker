import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar DateTime

  type SatelliteInfo {
    id: ID!
    name: String!
    tle: String!
    meanMotion: Float!
  }

  type SatellitePosition {
    id: ID!
    name: String!
    time: DateTime!
    lat: Float
    lng: Float
    alt: Float
  }

  type Query {
    satellite(id: ID!): SatelliteInfo!
    allSatellites: [SatelliteInfo]!
    fakePositions(
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): [SatellitePosition!]
    allPositions(
      ids: [ID!]!
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): [SatellitePosition!]
    position(
      id: ID!
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): SatellitePosition!
  }
`

export default typeDefs
