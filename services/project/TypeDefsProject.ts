// The GraphQL schema in string form
import {ProjectFields} from "../../databases/Project";
import {ModelComment} from "../comment/ModelComment";
import {ModelUser} from "../user/ModelUser";

export const ProjectDefsType = `
    type Project { 
        ${ProjectFields.id}: String,
        ${ProjectFields.name}: String, 
        ${ProjectFields.leaderId}: String!, 
        ${ProjectFields.leader}: User, 
        ${ProjectFields.partnerIds}: [String!], 
        ${ProjectFields.partners}: [User!],
        ${ProjectFields.comments}: [Comment!],
    }
`;
async function leader(root,args,context,info){
    console.log('yyyyyyyyyyyyyyyyyyy');
    var leaderId = root[ProjectFields.leaderId];
    var leader = await ModelUser.get(leaderId);
    return leader;
}
async function partners(root,args,context,info){
    var partnerIds = root[ProjectFields.partnerIds];
    if(!partnerIds) return [];
    var partners = await ModelUser.getSimples(partnerIds);
    root.dataValues[ProjectFields.partners] = partners;
    return partners;
}
async function comments(root,args,context,info){
    var projectId = root[ProjectFields.id];
    var comments = await ModelComment.list(projectId);
    return comments;
}
export const innerProjectResolvers = {
    Project: {
        [ProjectFields.partners]: partners,
        [ProjectFields.leader]: leader,
        [ProjectFields.comments]: partners
    },
};