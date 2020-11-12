import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar DateTime

  type Satellite {
    id: ID!
    name: String!
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
    allPositions(
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
