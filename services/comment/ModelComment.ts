import {Comment, CommentFields} from "../../databases/Comment";

export class ModelComment {
    static async list(subjectId) {
        var listComments = await Comment.findAll({
            where: {
                [CommentFields.objectId]: subjectId
            }
        });
        //Need fill user info to comments in this code section
        return listComments;
    }

    static async addComment(json, id) {
        json[CommentFields.id] = id;
        await Comment.create(json);
        return Comment.findById(id);
    }
}