import {innerProjectResolvers, ProjectDefsType} from "../project/TypeDefsProject";
const {makeExecutableSchema} = require('graphql-tools');
import { merge } from 'lodash';
import {UserDefsType} from "../user/TypeDefsUser";
import {CommentDefsType} from "../comment/TypeDefsComment";
import {ModelProject} from "./ModelProject";
const ProjectQuery = `
  type Query {
    getProject(id: String!): Project,
    listProjects: [Project!]
  }
`;

async function getProject(root,args,req,info) {
     var id = args.id;
     return await ModelProject.get(id);
}
async function listProjects(root,args,req,info) {
     return await ModelProject.getList();
}

export const projectResolvers = {
    Query: {
        getProject: getProject,
        listProjects: listProjects
    }
};
export default makeExecutableSchema({
    typeDefs: [ProjectQuery,  ProjectDefsType,UserDefsType,CommentDefsType],
    resolvers: merge(projectResolvers,innerProjectResolvers)
});