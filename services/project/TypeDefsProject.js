"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The GraphQL schema in string form
const Project_1 = require("../../databases/Project");
const ModelComment_1 = require("../comment/ModelComment");
const ModelUser_1 = require("../user/ModelUser");
exports.ProjectDefsType = `
    type Project { 
        ${Project_1.ProjectFields.id}: String,
        ${Project_1.ProjectFields.name}: String, 
        ${Project_1.ProjectFields.leaderId}: String!, 
        ${Project_1.ProjectFields.leader}: User, 
        ${Project_1.ProjectFields.partnerIds}: [String!], 
        ${Project_1.ProjectFields.partners}: [User!],
        ${Project_1.ProjectFields.comments}: [Comment!],
    }
`;
async function leader(root, args, context, info) {
    var leaderId = root[Project_1.ProjectFields.leaderId];
    var leader = await ModelUser_1.ModelUser.get(leaderId);
    root.dataValues[Project_1.ProjectFields.leader] = leader;
    return leader;
}
async function partners(root, args, context, info) {
    var partnerIds = root[Project_1.ProjectFields.partnerIds];
    var partners = await ModelUser_1.ModelUser.getSimples(partnerIds);
    root.dataValues[Project_1.ProjectFields.partners] = partners;
    return partners;
}
async function comments(root, args, context, info) {
    var projectId = root[Project_1.ProjectFields.id];
    var comments = await ModelComment_1.ModelComment.list(projectId);
    return comments;
}
exports.innerProjectResolvers = {
    Project: {
        [Project_1.ProjectFields.partners]: partners,
        [Project_1.ProjectFields.leader]: leader,
        [Project_1.ProjectFields.comments]: partners
    },
};
//# sourceMappingURL=TypeDefsProject.js.map