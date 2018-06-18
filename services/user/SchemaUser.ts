import {innerUserResolvers, UserDefsType} from "./TypeDefsUser";
import {innerProjectResolvers, ProjectDefsType} from "../project/TypeDefsProject";

const {makeExecutableSchema} = require('graphql-tools');
import {merge} from 'lodash';
import {UserFields} from "../../databases/User";
import {CommentDefsType, innerCommentResolvers} from "../comment/TypeDefsComment";
import {ModelUser} from "./ModelUser";
import {MathHelper} from "../../utities/MathHelper";
import {INPUT_CREATE_USER, INPUT_UPDATE_USER} from "./InputUser";
import {INPUT_COMMENT} from "../comment/ValidationComment";
import {CommentFields} from "../../databases/Comment";
import {ModelProject} from "../project/ModelProject";
import {ModelComment} from "../comment/ModelComment";
import {GraphQLType} from "../../graphql/GraphQLType";

const Query = {
    getUser: 'getUser',
    listUsers: 'listUsers'
}
const Mutation = {
    createUser: 'createUser',
    updateUser: 'updateUser',
    comment: 'comment'
}
const UserQueryString = `
  type Query {
    ${Query.getUser}(id: String!): ${GraphQLType.User},
    ${Query.listUsers}: [${GraphQLType.User}!]
  }
  type Mutation {
    createUser(
       ${INPUT_CREATE_USER}
    ): ${GraphQLType.User}!,
    updateUser(
       ${INPUT_UPDATE_USER} 
    ): ${GraphQLType.User}!
    comment(
        ${INPUT_COMMENT}
    ): ${GraphQLType.Comment}!
  }
`;

const resolveMutation = {}
const resolveQuery = {}


resolveQuery[Query.getUser] = async function(root, args, req, info) {
    return ModelUser.get(args[UserFields.id]);
}

resolveQuery[Query.listUsers] = async function (root, args, req, info) {
    var listUsers = await ModelUser.list();
    return listUsers;
}

resolveMutation[Mutation.createUser] = async function(root, args, req, info) {
    var id = MathHelper.genId();
    return await ModelUser.create(args, id);
}

resolveMutation[Mutation.updateUser] = async function (root, args, req, info) {
    var id = args[UserFields.id];
    delete args[UserFields.id];
    var user = await ModelUser.get(id);
    if (!user) {
        throw new Error('NOT EXIST USER');
    }
    return await ModelUser.update(args, id);
}

resolveMutation[Mutation.comment] = async function (root, args, req, info) {
    var id = MathHelper.genId();
    var objectId = args[CommentFields.objectId];
    var objectType = args[CommentFields.objectType];
    var validObjectTypes = ['project'];
    if (!validObjectTypes.includes(objectType)) {
        throw new Error('INVALID objectType');
    }
    var project = await ModelProject.get(objectId);
    if (!project) {
        throw new Error('NOT EXIST ENTITY');
    }
    args[CommentFields.createdByUserId] = '573412415182';
    return await ModelComment.addComment(args, id);
}

const resolvers = {
    Query: resolveQuery,
    Mutation: resolveMutation
};
export default makeExecutableSchema({
    typeDefs: [UserQueryString, UserDefsType, ProjectDefsType, CommentDefsType],
    resolvers: merge(resolvers, innerUserResolvers, innerProjectResolvers)
});