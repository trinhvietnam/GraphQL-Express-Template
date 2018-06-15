import {innerProjectResolvers, ProjectDefsType} from "../project/TypeDefsProject";

const {makeExecutableSchema} = require('graphql-tools');
import {merge} from 'lodash';
import {innerUserResolvers, UserDefsType} from "../user/TypeDefsUser";
import {CommentDefsType} from "../comment/TypeDefsComment";
import {ModelProject} from "./ModelProject";
import {VALIDATION_CREATE_PROJECT, VALIDATION_UPDATE_PROJECT} from "./ValidationProject";
import {MathHelper} from "../../utities/MathHelper";
import {ProjectFields} from "../../databases/Project";

const ProjectQuery = `
  type Query {
    getProject(id: String!): Project,
    listProjects: [Project!],
   
  }
  type Mutation {
    
    createProject(
        ${VALIDATION_CREATE_PROJECT}
    ): Project!,
    
    updateProject(
        ${VALIDATION_UPDATE_PROJECT}
    ): Project!,
  }
`;

async function getProject(root, args, req, info) {
    var id = args.id;
    return await ModelProject.get(id);
}

async function listProjects(root, args, req, info) {
    return await ModelProject.getList();
}

async function createProject(root, args, req, info) {
    var id = MathHelper.genId();
    args[ProjectFields.leaderId] = '573412415182';
    return await ModelProject.create(args, id);
}

async function updateProject(root, args, req, info) {
    var id = args[ProjectFields.id];
    var project = await ModelProject.get(id);
    if (!project) {
        throw new Error('NOT EXIST PROJECT');
    }
    delete args[ProjectFields.id];
    return ModelProject.update(args, id);
}

export const projectResolvers = {
    Query: {
        getProject: getProject,
        listProjects: listProjects
    },
    Mutation: {
        createProject: createProject,
        updateProject: updateProject,
    }
};
export default makeExecutableSchema({
    typeDefs: [ProjectQuery, ProjectDefsType, UserDefsType, CommentDefsType],
    resolvers: merge(projectResolvers, innerProjectResolvers, innerUserResolvers)
});