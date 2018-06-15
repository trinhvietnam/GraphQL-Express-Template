import {innerUserResolvers, UserDefsType} from "./TypeDefsUser";
import {ProjectDefsType} from "../project/TypeDefsProject";

const {makeExecutableSchema} = require('graphql-tools');
import {merge} from 'lodash';
import {UserFields} from "../../databases/User";
import {CommentDefsType} from "../comment/TypeDefsComment";
import {ModelUser} from "./ModelUser";
import {MathHelper} from "../../utities/MathHelper";


async function getUser(root, args, req, info) {
    return ModelUser.get(args[UserFields.id]);
}

async function listUsers(root, args, req, info) {
    return await ModelUser.list();
}

async function createUser(root, args, req, info) {
    var id = MathHelper.genId();
    return await ModelUser.create(args, id);
}

async function updateUser(root, args, req, info) {
    var id = args[UserFields.id];
    delete args[UserFields.id];
    var user = await ModelUser.get(id);
    if(!user){
        throw new Error('NOT EXIST USER');
    }
    return await ModelUser.update(args, id);
}

const UserQuery = `
  type Query {
    getUser(id: String!): User,
    listUsers: [User!]
  }
  type Mutation {
    createUser(
       ${UserFields.name}: String!, 
       ${UserFields.age}: Int!, 
       ${UserFields.phone}: String!, 
       ${UserFields.email}: String!, 
    ): User!,
    updateUser(
       ${UserFields.id}: String!, 
       ${UserFields.name}: String, 
       ${UserFields.age}: Int, 
       ${UserFields.phone}: String, 
       ${UserFields.email}: String, 
       ${UserFields.country}: String, 
       ${UserFields.city}: String, 
       ${UserFields.district}: String, 
       ${UserFields.address}: String 
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
export default makeExecutableSchema({
    typeDefs: [UserQuery, UserDefsType, ProjectDefsType, CommentDefsType],
    resolvers: merge(userResolvers, innerUserResolvers)
});