import {UserFields} from "../../databases/User";

export const INPUT_CREATE_USER = `
       ${UserFields.name}: String!, 
       ${UserFields.age}: Int!, 
       ${UserFields.phone}: String!, 
       ${UserFields.email}: String!, 
`;
export const INPUT_UPDATE_USER = `
       ${UserFields.id}: String!, 
       ${UserFields.name}: String, 
       ${UserFields.age}: Int, 
       ${UserFields.phone}: String, 
       ${UserFields.email}: String, 
       ${UserFields.country}: String, 
       ${UserFields.city}: String, 
       ${UserFields.district}: String, 
       ${UserFields.address}: String 
`;
