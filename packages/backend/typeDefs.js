import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar DateTime

  type Satellite {
    id: ID!
    name: String!
  }

  type SatellitePosition {
    id: ID!
    time: DateTime!
    lat: Float
    lng: Float
    alt: Float
  }

  type Query {
    position(
      id: ID!
      observerLat: Float!
      observerLng: Float!
      observerAlt: Float!
    ): SatellitePosition!
  }
`

export default typeDefs
