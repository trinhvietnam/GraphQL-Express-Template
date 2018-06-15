import {innerUserResolvers, UserDefsType} from "./TypeDefsUser";
import {innerProjectResolvers, ProjectDefsType} from "../project/TypeDefsProject";

const {makeExecutableSchema} = require('graphql-tools');
import {merge} from 'lodash';
import {UserFields} from "../../databases/User";
import {CommentDefsType, innerCommentResolvers} from "../comment/TypeDefsComment";
import {ModelUser} from "./ModelUser";
import {MathHelper} from "../../utities/MathHelper";
import {VALIDATION_CREATE_USER, VALIDATION_UPDATE_USER} from "./ValidationUser";
import {VALIDATION_COMMENT} from "../comment/ValidationComment";
import {CommentFields} from "../../databases/Comment";
import {ModelProject} from "../project/ModelProject";
import {ModelComment} from "../comment/ModelComment";


async function getUser(root, args, req, info) {
    return ModelUser.get(args[UserFields.id]);
}

async function listUsers(root, args, req, info) {
    var listUsers =  await ModelUser.list();
    return listUsers;
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
async function comment(root,args,req,info){
    var id = MathHelper.genId();
    var objectId = args[CommentFields.objectId];
    var objectType =  args[CommentFields.objectType];
    var validObjectTypes = ['project'];
    if(!validObjectTypes.includes(objectType)){
        throw new Error('INVALID objectType');
    }
    var project = await ModelProject.get(objectId);
    if(!project){
        throw new Error('NOT EXIST ENTITY');
    }
    args[CommentFields.createdByUserId] = '573412415182';
    return await ModelComment.addComment(args,id);
}
const UserQuery = `
  type Query {
    getUser(id: String!): User,
    listUsers: [User!]
  }
  type Mutation {
    createUser(
       ${VALIDATION_CREATE_USER}
    ): User!,
    updateUser(
       ${VALIDATION_UPDATE_USER} 
    ): User!
    comment(
        ${VALIDATION_COMMENT}
    ):Comment!
  }
`;

const userResolvers = {
    Query: {
        getUser: getUser,
        listUsers: listUsers
    },
    Mutation: {
        createUser: createUser,
        updateUser: updateUser,
        comment: comment,
    }
};
export default makeExecutableSchema({
    typeDefs: [UserQuery, UserDefsType, ProjectDefsType, CommentDefsType],
    resolvers: merge(userResolvers, innerUserResolvers,innerProjectResolvers, innerCommentResolvers)
});