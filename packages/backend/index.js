import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'
import path from 'path'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

config({
  path: path.resolve(process.cwd(), './config.base'),
  debug: process.env.NODE_ENV !== 'production',
})

const apiGraphQL = new ApolloServer({
  path: '/',
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
  async context({ req }) {},
})

apiGraphQL
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
