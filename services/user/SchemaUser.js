"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeDefsUser_1 = require("./TypeDefsUser");
const { makeExecutableSchema } = require('graphql-tools');
const lodash_1 = require("lodash");
const User_1 = require("../../databases/User");
const ModelUser_1 = require("./ModelUser");
const MathHelper_1 = require("../../utities/MathHelper");
const InputUser_1 = require("./InputUser");
const ValidationComment_1 = require("../comment/ValidationComment");
const Comment_1 = require("../../databases/Comment");
const ModelProject_1 = require("../project/ModelProject");
const ModelComment_1 = require("../comment/ModelComment");
const GraphQLType_1 = require("../../graphql/GraphQLType");
const ScalarTypes_1 = require("../../graphql/ScalarTypes");
const TypeDefsProject_1 = require("../project/TypeDefsProject");
const TypeDefsComment_1 = require("../comment/TypeDefsComment");
const Query = {
    getUser: 'getUser',
    listUsers: 'listUsers'
};
const Mutation = {
    createUser: 'createUser',
    updateUser: 'updateUser',
    comment: 'comment'
};
const UserQueryString = `
  type Query {
    ${Query.getUser}(id: String!): ${GraphQLType_1.GraphQLType.User},
    ${Query.listUsers}: [${GraphQLType_1.GraphQLType.User}!]
  }
  type Mutation {
    createUser(
       ${InputUser_1.INPUT_CREATE_USER}
    ): ${GraphQLType_1.GraphQLType.User}!,
    updateUser(
       ${InputUser_1.INPUT_UPDATE_USER} 
    ): ${GraphQLType_1.GraphQLType.User}!
    comment(
        ${ValidationComment_1.INPUT_COMMENT}
    ): ${GraphQLType_1.GraphQLType.Comment}!
  }
`;
const resolveMutation = {};
const resolveQuery = {};
resolveQuery[Query.getUser] = async function (root, args, req, info) {
    return ModelUser_1.ModelUser.get(args[User_1.UserFields.id]);
};
resolveQuery[Query.listUsers] = async function (root, args, req, info) {
    var listUsers = await ModelUser_1.ModelUser.list();
    return listUsers;
};
resolveMutation[Mutation.createUser] = async function (root, args, req, info) {
    var id = MathHelper_1.MathHelper.genId();
    return await ModelUser_1.ModelUser.create(args, id);
};
resolveMutation[Mutation.updateUser] = async function (root, args, req, info) {
    var id = args[User_1.UserFields.id];
    delete args[User_1.UserFields.id];
    var user = await ModelUser_1.ModelUser.get(id);
    if (!user) {
        throw new Error('NOT EXIST USER');
    }
    return await ModelUser_1.ModelUser.update(args, id);
};
resolveMutation[Mutation.comment] = async function (root, args, req, info) {
    var id = MathHelper_1.MathHelper.genId();
    var objectId = args[Comment_1.CommentFields.objectId];
    var objectType = args[Comment_1.CommentFields.objectType];
    var validObjectTypes = ['project'];
    if (!validObjectTypes.includes(objectType)) {
        throw new Error('INVALID objectType');
    }
    var project = await ModelProject_1.ModelProject.get(objectId);
    if (!project) {
        throw new Error('NOT EXIST ENTITY');
    }
    args[Comment_1.CommentFields.createdByUserId] = '573412415182';
    return await ModelComment_1.ModelComment.addComment(args, id);
};
const UserDefsType = `
    ${TypeDefsProject_1.ProjectType}
    ${TypeDefsUser_1.UserType}
    ${TypeDefsComment_1.CommentType}
`;
const resolvers = {
    Query: resolveQuery,
    Mutation: resolveMutation
};
console.log([UserQueryString, UserDefsType, 'scalar JSON', 'scalar Date'].join('\n'));
exports.default = makeExecutableSchema({
    typeDefs: [UserQueryString, UserDefsType, 'scalar JSON', 'scalar Date'],
    resolvers: lodash_1.merge(resolvers, TypeDefsUser_1.innerUserResolvers, TypeDefsProject_1.innerProjectResolvers, { JSON: ScalarTypes_1.ScalarJSON })
});
//# sourceMappingURL=SchemaUser.js.map