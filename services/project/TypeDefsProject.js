"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The GraphQL schema in string form
const Project_1 = require("../../databases/Project");
const ModelComment_1 = require("../comment/ModelComment");
const ModelUser_1 = require("../user/ModelUser");
const GraphQLType_1 = require("../../graphql/GraphQLType");
exports.ProjectDefsType = `
    type ${GraphQLType_1.GraphQLType.Project} { 
        ${Project_1.ProjectFields.id}: String,
        ${Project_1.ProjectFields.name}: String, 
        ${Project_1.ProjectFields.leaderId}: String!, 
        ${Project_1.ProjectFields.leader}: ${GraphQLType_1.GraphQLType.User}, 
        ${Project_1.ProjectFields.partnerIds}: [String!], 
        ${Project_1.ProjectFields.partners}: [${GraphQLType_1.GraphQLType.User}!],
        ${Project_1.ProjectFields.comments}: [${GraphQLType_1.GraphQLType.Comment}!],
    }
`;
var rsProject = {};
rsProject[Project_1.ProjectFields.leader] = async function (root, args, context, info) {
    var leaderId = root[Project_1.ProjectFields.leaderId];
    var leader = await ModelUser_1.ModelUser.get(leaderId);
    return leader;
};
rsProject[Project_1.ProjectFields.partners] = async function (root, args, context, info) {
    var partnerIds = root[Project_1.ProjectFields.partnerIds];
    if (!partnerIds)
        return [];
    var partners = await ModelUser_1.ModelUser.getSimples(partnerIds);
    root.dataValues[Project_1.ProjectFields.partners] = partners;
    return partners;
};
rsProject[Project_1.ProjectFields.comments] = async function (root, args, context, info) {
    var projectId = root[Project_1.ProjectFields.id];
    var comments = await ModelComment_1.ModelComment.list(projectId);
    return comments;
};
exports.innerProjectResolvers = {
    Project: rsProject
};
//# sourceMappingURL=TypeDefsProject.js.map