"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("graphql/language");
const definition_1 = require("graphql/type/definition");
const parseLiteralJSON = (ast) => {
    switch (ast.kind) {
        case language_1.Kind.STRING:
        case language_1.Kind.BOOLEAN:
            return ast.value;
        case language_1.Kind.INT:
            return parseInt(ast.value);
        case language_1.Kind.FLOAT:
            return parseFloat(ast.value);
        case language_1.Kind.OBJECT: {
            const value = Object.create(null);
            for (const field of ast.fields) {
                value[field.name.value] = parseLiteralJSON(field.value);
            }
            return value;
        }
        case language_1.Kind.LIST:
            return ast.values.map(parseLiteralJSON);
        default:
            return null;
    }
};
exports.ScalarJSON = new definition_1.GraphQLScalarType({
    name: 'JSON',
    description: 'The `JSON` scalar type represents JSON values as specified by ' +
        '[ECMA-404](http://www.ecma-international.org/' +
        'publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: value => value,
    parseValue: value => value,
    parseLiteral: parseLiteralJSON,
});
exports.ScalarDate = new definition_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue: value => value,
    serialize: value => value,
    parseLiteral: value => value,
});
exports.ScalarInt64 = new definition_1.GraphQLScalarType({
    name: 'Int64',
    description: 'The `Int64` scalar type represents non-fractional signed whole numeric values.',
    parseValue: value => value,
    serialize: value => value,
    parseLiteral: value => value,
});
//# sourceMappingURL=ScalarTypes.js.map