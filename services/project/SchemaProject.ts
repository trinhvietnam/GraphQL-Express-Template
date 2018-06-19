import {innerProjectResolvers, ProjectType} from "../project/TypeDefsProject";
const {makeExecutableSchema} = require('graphql-tools');
import {merge} from 'lodash';
import {innerUserResolvers, UserType} from "../user/TypeDefsUser";
import {CommentType, innerCommentResolvers} from "../comment/TypeDefsComment";
import {ModelProject} from "./ModelProject";
import {INPUT_CREATE_PROJECT, INPUT_UPDATE_PROJECT} from "./InputProject";
import {MathHelper} from "../../utities/MathHelper";
import {ProjectFields} from "../../databases/Project";
import {GraphQLType} from "../../graphql/GraphQLType";
import {ScalarDate, ScalarJSON} from "../../graphql/ScalarTypes";
const Query = {
    getProject:'getProject',
    listProjects:'listProjects',
}
const Mutation = {
    createProject:'createProject',
    updateProject:'updateProject'
}

const ProjectQueryString = `
  type Query {
    ${Query.getProject}(id: String!): ${GraphQLType.Project},
    listProjects: [${GraphQLType.Project}!],
  }
  type Mutation {
    ${Mutation.createProject}(
        ${INPUT_CREATE_PROJECT}
    ): ${GraphQLType.Project}!,
    
    ${Mutation.updateProject}(
        ${INPUT_UPDATE_PROJECT}
    ): ${GraphQLType.Project}!,
  }
`;
var rsQuery = {}
var rsMutation = {}
rsQuery[Query.getProject] = async function (root, args, req, info) {
    var id = args.id;
    return await ModelProject.get(id);
}

rsQuery[Query.listProjects] = async function (root, args, req, info) {
    return await ModelProject.getList();
}

rsMutation[Mutation.createProject] = async function (root, args, req, info) {
    var id = MathHelper.genId();
    args[ProjectFields.leaderId] = '573412415182';
    return await ModelProject.create(args, id);
}

rsMutation[Mutation.updateProject] = async function (root, args, req, info) {
    var id = args[ProjectFields.id];
    var project = await ModelProject.get(id);
    if (!project) {
        throw new Error('NOT EXIST PROJECT');
    }
    delete args[ProjectFields.id];
    return ModelProject.update(args, id);
}
export const ProjectDefsType = `
    ${CommentType}
    ${UserType}
    ${ProjectType}
`;
export const resolvers = {
    Query: rsQuery,
    Mutation: rsMutation
};
console.log( [ProjectQueryString, ProjectDefsType,'scalar JSON','scalar Date'].join('\n'));
export default makeExecutableSchema({
    typeDefs: [ProjectQueryString, ProjectDefsType,'scalar JSON','scalar Date'],
    resolvers: merge(resolvers, innerProjectResolvers,innerUserResolvers,innerCommentResolvers,{JSON:ScalarJSON},{Date:ScalarDate})
});