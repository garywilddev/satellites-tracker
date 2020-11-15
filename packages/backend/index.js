import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import dbManager from './dbManager'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

const apiGraphQL = new ApolloServer({
  path: '/',
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
  async context() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    return dbManager
  },
})

apiGraphQL
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
