// The GraphQL schema in string form
import {ProjectFields} from "../../databases/Project";
import {ModelComment} from "../comment/ModelComment";
import {ModelUser} from "../user/ModelUser";
import {GraphQLType} from "../../graphql/GraphQLType";
import {rsComment} from "../comment/TypeDefsComment";
import {rsUser} from "../user/TypeDefsUser";
export const ProjectType = `
    type ${GraphQLType.Project} { 
        ${ProjectFields.id}: String,
        ${ProjectFields.name}: String, 
        ${ProjectFields.info}: JSON, 
        ${ProjectFields.leaderId}: String!, 
        ${ProjectFields.leader}: ${GraphQLType.User}, 
        ${ProjectFields.partnerIds}: [String!], 
        ${ProjectFields.partners}: [${GraphQLType.User}!],
        ${ProjectFields.comments}: [${GraphQLType.Comment}!],
    }`;

export const rsProject = {};
rsProject[ProjectFields.leader] = async function (root, args, context, info) {
    var leaderId = root[ProjectFields.leaderId];
    var leader = await ModelUser.get(leaderId);
    return leader;
}
rsProject[ProjectFields.partners] = async function (root, args, context, info) {
    var partnerIds = root[ProjectFields.partnerIds];
    if (!partnerIds) return [];
    var partners = await ModelUser.getSimples(partnerIds);
    root.dataValues[ProjectFields.partners] = partners;
    return partners;
}
rsProject[ProjectFields.comments] = async function (root, args, context, info) {
    var projectId = root[ProjectFields.id];
    var comments = await ModelComment.list(projectId);
    return comments;
}
export const innerProjectResolvers = {
    Project: rsProject
};