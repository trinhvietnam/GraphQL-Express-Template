// The GraphQL schema in string form
import {CommentFields} from "../../databases/Comment";
import {ModelUser} from "../user/ModelUser";
export const CommentType = `
    type Comment { 
        ${CommentFields.id}: String,
        ${CommentFields.content}: String, 
        ${CommentFields.createdByUserId}: String, 
        ${CommentFields.createdByUser}: User, 
        ${CommentFields.objectId}: String! 
        ${CommentFields.objectType}: String! 
    }`;
export const CommentDefsType = `
    ${CommentType}
`;
export const rsComment = {};
rsComment[CommentFields.createdByUser] = async function (root,args,req,info){
    var createdByUserId = root[CommentFields.createdByUserId];
    return ModelUser.get(createdByUserId);
}

export const innerCommentResolvers = {
    Comment: rsComment,
};