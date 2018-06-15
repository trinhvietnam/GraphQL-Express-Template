"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The GraphQL schema in string form
const Comment_1 = require("../../databases/Comment");
const ModelUser_1 = require("../user/ModelUser");
exports.CommentDefsType = `type Comment { 
        ${Comment_1.CommentFields.id}: String,
        ${Comment_1.CommentFields.content}: String, 
        ${Comment_1.CommentFields.createdByUserId}: String, 
        ${Comment_1.CommentFields.createdByUser}: User, 
        ${Comment_1.CommentFields.objectId}: String! 
        ${Comment_1.CommentFields.objectType}: String! 
    }
`;
async function createdByUser(root, args, req, info) {
    var createdByUserId = root[Comment_1.CommentFields.createdByUserId];
    return ModelUser_1.ModelUser.get(createdByUserId);
}
exports.innerCommentResolvers = {
    Comment: {
        [Comment_1.CommentFields.createdByUser]: createdByUser
    },
};
//# sourceMappingURL=TypeDefsComment.js.map