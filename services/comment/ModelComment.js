"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = require("../../databases/Comment");
class ModelComment {
    static async list(subjectId) {
        var listComments = await Comment_1.Comment.findAll({
            where: {
                [Comment_1.CommentFields.objectId]: subjectId
            }
        });
        //Need fill user info to comments in this code section
        return listComments;
    }
    static async addComment(json, id) {
        json[Comment_1.CommentFields.id] = id;
        await Comment_1.Comment.create(json);
        return Comment_1.Comment.findById(id);
    }
}
exports.ModelComment = ModelComment;
//# sourceMappingURL=ModelComment.js.map