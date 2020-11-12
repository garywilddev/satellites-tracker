import { ApolloServer } from 'apollo-server'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const apiGraphQL = new ApolloServer({
  path: '/',
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
})

apiGraphQL
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
