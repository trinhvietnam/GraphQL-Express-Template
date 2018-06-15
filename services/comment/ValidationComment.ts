import {CommentFields} from "../../databases/Comment";

export const VALIDATION_COMMENT = `
    ${CommentFields.objectId}: String!,
    ${CommentFields.objectType}: String!,
    ${CommentFields.content}: String!,
`