import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type/definition'

const parseLiteralJSON = (ast) => {
    switch (ast.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return ast.value
        case Kind.INT:
            return parseInt(ast.value)
        case Kind.FLOAT:
            return parseFloat(ast.value)
        case Kind.OBJECT: {
            const value = Object.create(null)
            for (const field of ast.fields) {
                value[field.name.value] = parseLiteralJSON(field.value)
            }
            return value
        }
        case Kind.LIST:
            return ast.values.map(parseLiteralJSON)
        default:
            return null
    }
}

export const ScalarJSON = new GraphQLScalarType({
    name: 'JSON',
    description:
    'The `JSON` scalar type represents JSON values as specified by ' +
    '[ECMA-404](http://www.ecma-international.org/' +
    'publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: parseLiteralJSON,
})

export const ScalarDate = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: value => value, // value from the client
    serialize: value => value, // value sent to the client
    parseLiteral: value => value,
})

export const ScalarInt64 = new GraphQLScalarType({
    name: 'Int64',
    description: 'The `Int64` scalar type represents non-fractional signed whole numeric values.',
    parseValue: value => value, // value from the client
    serialize: value => value, // value sent to the client
    parseLiteral: value => value,
})
