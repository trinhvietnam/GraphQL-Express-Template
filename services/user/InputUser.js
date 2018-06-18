"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../databases/User");
exports.INPUT_CREATE_USER = `
       ${User_1.UserFields.name}: String!, 
       ${User_1.UserFields.age}: Int!, 
       ${User_1.UserFields.phone}: String!, 
       ${User_1.UserFields.email}: String!, 
`;
exports.INPUT_UPDATE_USER = `
       ${User_1.UserFields.id}: String!, 
       ${User_1.UserFields.name}: String, 
       ${User_1.UserFields.age}: Int, 
       ${User_1.UserFields.phone}: String, 
       ${User_1.UserFields.email}: String, 
       ${User_1.UserFields.country}: String, 
       ${User_1.UserFields.city}: String, 
       ${User_1.UserFields.district}: String, 
       ${User_1.UserFields.address}: String 
`;
//# sourceMappingURL=InputUser.js.map