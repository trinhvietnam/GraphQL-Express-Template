"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeDefsProject_1 = require("../project/TypeDefsProject");
const { makeExecutableSchema } = require('graphql-tools');
const lodash_1 = require("lodash");
const TypeDefsUser_1 = require("../user/TypeDefsUser");
const TypeDefsComment_1 = require("../comment/TypeDefsComment");
const ModelProject_1 = require("./ModelProject");
const ProjectQuery = `
  type Query {
    getProject(id: String!): Project,
    listProjects: [Project!]
  }
`;
async function getProject(root, args, req, info) {
    var id = args.id;
    return await ModelProject_1.ModelProject.get(id);
}
async function listProjects(root, args, req, info) {
    return await ModelProject_1.ModelProject.getList();
}
exports.projectResolvers = {
    Query: {
        getProject: getProject,
        listProjects: listProjects
    }
};
exports.default = makeExecutableSchema({
    typeDefs: [ProjectQuery, TypeDefsProject_1.ProjectDefsType, TypeDefsUser_1.UserDefsType, TypeDefsComment_1.CommentDefsType],
    resolvers: lodash_1.merge(exports.projectResolvers, TypeDefsProject_1.innerProjectResolvers)
});
//# sourceMappingURL=SchemaProject.js.map