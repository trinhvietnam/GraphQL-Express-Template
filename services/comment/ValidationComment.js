"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = require("../../databases/Comment");
exports.INPUT_COMMENT = `
    ${Comment_1.CommentFields.objectId}: String!,
    ${Comment_1.CommentFields.objectType}: String!,
    ${Comment_1.CommentFields.content}: String!,
`;
//# sourceMappingURL=ValidationComment.js.map