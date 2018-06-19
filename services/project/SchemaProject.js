"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypeDefsProject_1 = require("../project/TypeDefsProject");
const { makeExecutableSchema } = require('graphql-tools');
const lodash_1 = require("lodash");
const TypeDefsUser_1 = require("../user/TypeDefsUser");
const TypeDefsComment_1 = require("../comment/TypeDefsComment");
const ModelProject_1 = require("./ModelProject");
const InputProject_1 = require("./InputProject");
const MathHelper_1 = require("../../utities/MathHelper");
const Project_1 = require("../../databases/Project");
const GraphQLType_1 = require("../../graphql/GraphQLType");
const ScalarTypes_1 = require("../../graphql/ScalarTypes");
const Query = {
    getProject: 'getProject',
    listProjects: 'listProjects',
};
const Mutation = {
    createProject: 'createProject',
    updateProject: 'updateProject'
};
const ProjectQueryString = `
  type Query {
    ${Query.getProject}(id: String!): ${GraphQLType_1.GraphQLType.Project},
    listProjects: [${GraphQLType_1.GraphQLType.Project}!],
  }
  type Mutation {
    ${Mutation.createProject}(
        ${InputProject_1.INPUT_CREATE_PROJECT}
    ): ${GraphQLType_1.GraphQLType.Project}!,
    
    ${Mutation.updateProject}(
        ${InputProject_1.INPUT_UPDATE_PROJECT}
    ): ${GraphQLType_1.GraphQLType.Project}!,
  }
`;
var rsQuery = {};
var rsMutation = {};
rsQuery[Query.getProject] = async function (root, args, req, info) {
    var id = args.id;
    return await ModelProject_1.ModelProject.get(id);
};
rsQuery[Query.listProjects] = async function (root, args, req, info) {
    return await ModelProject_1.ModelProject.getList();
};
rsMutation[Mutation.createProject] = async function (root, args, req, info) {
    var id = MathHelper_1.MathHelper.genId();
    args[Project_1.ProjectFields.leaderId] = '573412415182';
    return await ModelProject_1.ModelProject.create(args, id);
};
rsMutation[Mutation.updateProject] = async function (root, args, req, info) {
    var id = args[Project_1.ProjectFields.id];
    var project = await ModelProject_1.ModelProject.get(id);
    if (!project) {
        throw new Error('NOT EXIST PROJECT');
    }
    delete args[Project_1.ProjectFields.id];
    return ModelProject_1.ModelProject.update(args, id);
};
exports.ProjectDefsType = `
    ${TypeDefsComment_1.CommentType}
    ${TypeDefsUser_1.UserType}
    ${TypeDefsProject_1.ProjectType}
`;
exports.resolvers = {
    Query: rsQuery,
    Mutation: rsMutation
};
console.log([ProjectQueryString, exports.ProjectDefsType, 'scalar JSON', 'scalar Date'].join('\n'));
exports.default = makeExecutableSchema({
    typeDefs: [ProjectQueryString, exports.ProjectDefsType, 'scalar JSON', 'scalar Date'],
    resolvers: lodash_1.merge(exports.resolvers, TypeDefsProject_1.innerProjectResolvers, TypeDefsUser_1.innerUserResolvers, TypeDefsComment_1.innerCommentResolvers, { JSON: ScalarTypes_1.ScalarJSON }, { Date: ScalarTypes_1.ScalarDate })
});
//# sourceMappingURL=SchemaProject.js.map