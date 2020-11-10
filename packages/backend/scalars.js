import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value).valueOf() // value from the client
  },
  serialize(value) {
    return new Date(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value).valueOf() // ast value is always in string format
    }
    return null
  },
})

export default {
  DateTime,
}
