"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeDefsUser_1 = require("./TypeDefsUser");
const TypeDefsProject_1 = require("../project/TypeDefsProject");
const { makeExecutableSchema } = require('graphql-tools');
const lodash_1 = require("lodash");
const User_1 = require("../../databases/User");
const TypeDefsComment_1 = require("../comment/TypeDefsComment");
const ModelUser_1 = require("./ModelUser");
const MathHelper_1 = require("../../utities/MathHelper");
async function getUser(root, args, req, info) {
    return ModelUser_1.ModelUser.get(args[User_1.UserFields.id]);
}
async function listUsers(root, args, req, info) {
    return await ModelUser_1.ModelUser.list();
}
async function createUser(root, args, req, info) {
    var id = MathHelper_1.MathHelper.genId();
    return await ModelUser_1.ModelUser.create(args, id);
}
async function updateUser(root, args, req, info) {
    var id = args[User_1.UserFields.id];
    delete args[User_1.UserFields.id];
    var user = await ModelUser_1.ModelUser.get(id);
    if (!user) {
        throw new Error('NOT EXIST USER');
    }
    return await ModelUser_1.ModelUser.update(args, id);
}
const UserQuery = `
  type Query {
    getUser(id: String!): User,
    listUsers: [User!]
  }
  type Mutation {
    createUser(
       ${User_1.UserFields.name}: String!, 
       ${User_1.UserFields.age}: Int!, 
       ${User_1.UserFields.phone}: String!, 
       ${User_1.UserFields.email}: String!, 
    ): User!,
    updateUser(
       ${User_1.UserFields.id}: String!, 
       ${User_1.UserFields.name}: String, 
       ${User_1.UserFields.age}: Int, 
       ${User_1.UserFields.phone}: String, 
       ${User_1.UserFields.email}: String, 
       ${User_1.UserFields.country}: String, 
       ${User_1.UserFields.city}: String, 
       ${User_1.UserFields.district}: String, 
       ${User_1.UserFields.address}: String 
    ): User!
  }
`;
const userResolvers = {
    Query: {
        getUser: getUser,
        listUsers: listUsers
    },
    Mutation: {
        createUser: createUser,
        updateUser: updateUser
    }
};
exports.default = makeExecutableSchema({
    typeDefs: [UserQuery, TypeDefsUser_1.UserDefsType, TypeDefsProject_1.ProjectDefsType, TypeDefsComment_1.CommentDefsType],
    resolvers: lodash_1.merge(userResolvers, TypeDefsUser_1.innerUserResolvers)
});
//# sourceMappingURL=SchemaUser.js.map