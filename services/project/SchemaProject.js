"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeDefsProject_1 = require("../project/TypeDefsProject");
const { makeExecutableSchema } = require('graphql-tools');
const lodash_1 = require("lodash");
const TypeDefsUser_1 = require("../user/TypeDefsUser");
const TypeDefsComment_1 = require("../comment/TypeDefsComment");
const ModelProject_1 = require("./ModelProject");
const ValidationProject_1 = require("./ValidationProject");
const MathHelper_1 = require("../../utities/MathHelper");
const Project_1 = require("../../databases/Project");
const ProjectQuery = `
  type Query {
    getProject(id: String!): Project,
    listProjects: [Project!],
   
  }
  type Mutation {
    
    createProject(
        ${ValidationProject_1.VALIDATION_CREATE_PROJECT}
    ): Project!,
    
    updateProject(
        ${ValidationProject_1.VALIDATION_UPDATE_PROJECT}
    ): Project!,
  }
`;
async function getProject(root, args, req, info) {
    var id = args.id;
    return await ModelProject_1.ModelProject.get(id);
}
async function listProjects(root, args, req, info) {
    return await ModelProject_1.ModelProject.getList();
}
async function createProject(root, args, req, info) {
    var id = MathHelper_1.MathHelper.genId();
    args[Project_1.ProjectFields.leaderId] = '573412415182';
    return await ModelProject_1.ModelProject.create(args, id);
}
async function updateProject(root, args, req, info) {
    var id = args[Project_1.ProjectFields.id];
    var project = await ModelProject_1.ModelProject.get(id);
    if (!project) {
        throw new Error('NOT EXIST PROJECT');
    }
    delete args[Project_1.ProjectFields.id];
    return ModelProject_1.ModelProject.update(args, id);
}
exports.projectResolvers = {
    Query: {
        getProject: getProject,
        listProjects: listProjects
    },
    Mutation: {
        createProject: createProject,
        updateProject: updateProject,
    }
};
exports.default = makeExecutableSchema({
    typeDefs: [ProjectQuery, TypeDefsProject_1.ProjectDefsType, TypeDefsUser_1.UserDefsType, TypeDefsComment_1.CommentDefsType],
    resolvers: lodash_1.merge(exports.projectResolvers, TypeDefsProject_1.innerProjectResolvers, TypeDefsUser_1.innerUserResolvers)
});
//# sourceMappingURL=SchemaProject.js.map