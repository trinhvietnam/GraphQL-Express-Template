"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The GraphQL schema in string form
const User_1 = require("../../databases/User");
const ModelProject_1 = require("../project/ModelProject");
const GraphQLType_1 = require("../../graphql/GraphQLType");
exports.UserType = `
    type ${GraphQLType_1.GraphQLType.User} { 
        ${User_1.UserFields.id}: String,
        ${User_1.UserFields.name}: String, 
        ${User_1.UserFields.firstName}: String, 
        ${User_1.UserFields.lastName}: String, 
        ${User_1.UserFields.age}: Int, 
        ${User_1.UserFields.avatar}: String, 
        ${User_1.UserFields.cover}: String, 
        ${User_1.UserFields.address}: String, 
        ${User_1.UserFields.district}: String, 
        ${User_1.UserFields.city}: String, 
        ${User_1.UserFields.country}: String, 
        ${User_1.UserFields.email}: String, 
        ${User_1.UserFields.phone}: String, 
        ${User_1.UserFields.isValidatedEmail}: Boolean, 
        ${User_1.UserFields.isValidatedPhone}: Boolean, 
        ${User_1.UserFields.language}: Boolean, 
        ${User_1.UserFields.type}: [String!], 
        ${User_1.UserFields.loginAt}: Date, 
        ${User_1.UserFields.projects}: [${GraphQLType_1.GraphQLType.Project}!], 
    }`;
exports.rsUser = {};
exports.rsUser[User_1.UserFields.projects] = async function (root, args, req, info) {
    var userId = root[User_1.UserFields.id];
    var projects = await ModelProject_1.ModelProject.getProjectOfUser(userId);
    return projects;
};
exports.innerUserResolvers = {
    User: exports.rsUser
};
//# sourceMappingURL=TypeDefsUser.js.map