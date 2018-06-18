import {CommentFields} from "../../databases/Comment";

export const INPUT_COMMENT = `
    ${CommentFields.objectId}: String!,
    ${CommentFields.objectType}: String!,
    ${CommentFields.content}: String!,
`