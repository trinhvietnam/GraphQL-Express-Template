// The GraphQL schema in string form
import {UserFields} from "../../databases/User";
import {ModelProject} from "../project/ModelProject";
export const UserDefsType = `type User { 
        ${UserFields.id}: String,
        ${UserFields.name}: String, 
        ${UserFields.firstName}: String, 
        ${UserFields.lastName}: String, 
        ${UserFields.age}: Int, 
        ${UserFields.avatar}: String, 
        ${UserFields.cover}: String, 
        ${UserFields.address}: String, 
        ${UserFields.district}: String, 
        ${UserFields.city}: String, 
        ${UserFields.country}: String, 
        ${UserFields.email}: String, 
        ${UserFields.phone}: String, 
        ${UserFields.isValidatedEmail}: Boolean, 
        ${UserFields.isValidatedPhone}: Boolean, 
        ${UserFields.language}: Boolean, 
        ${UserFields.type}: [String!], 
        ${UserFields.projects}: [Project!], 
    }
`;

async function projects(root, args, req, info) {
    var userId = root[UserFields.id];
    var projects = await ModelProject.getProjectOfUser(userId);
    return projects;
}

export const innerUserResolvers = {
    User: {
        projects: projects,
    }
};