// The GraphQL schema in string form
import {CommentFields} from "../../databases/Comment";
import {ModelUser} from "../user/ModelUser";

export const CommentDefsType = `type Comment { 
        ${CommentFields.id}: String,
        ${CommentFields.content}: String, 
        ${CommentFields.createdByUserId}: String, 
        ${CommentFields.createdByUser}: User, 
        ${CommentFields.objectId}: String! 
        ${CommentFields.objectType}: String! 
    }
`;

async function createdByUser(root, args, req, info) {
    var createdByUserId = root[CommentFields.createdByUserId];
    return ModelUser.get(createdByUserId);
}

export const innerCommentResolvers = {
    Comment: {
        [CommentFields.createdByUser]: createdByUser
    },
};