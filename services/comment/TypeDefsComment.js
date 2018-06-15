"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The GraphQL schema in string form
const Comment_1 = require("../../databases/Comment");
exports.CommentDefsType = `type Comment { 
        ${Comment_1.CommentFields.id}: String,
        ${Comment_1.CommentFields.content}: String, 
        ${Comment_1.CommentFields.createdByUserId}: String, 
        ${Comment_1.CommentFields.createdByUser}: User, 
        ${Comment_1.CommentFields.subjectId}: String! 
        ${Comment_1.CommentFields.subjectType}: String! 
    }
`;
//# sourceMappingURL=TypeDefsComment.js.map