// The GraphQL schema in string form
import {CommentFields} from "../../databases/Comment";

export const CommentDefsType = `type Comment { 
        ${CommentFields.id}: String,
        ${CommentFields.content}: String, 
        ${CommentFields.createdByUserId}: String, 
        ${CommentFields.createdByUser}: User, 
        ${CommentFields.subjectId}: String! 
        ${CommentFields.subjectType}: String! 
    }
`;
