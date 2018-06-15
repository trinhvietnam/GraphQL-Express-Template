"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Base_1 = require("./_Base");
const sequelize_1 = require("sequelize");
exports.CommentFields = {
    id: 'id',
    content: 'content',
    createdByUserId: 'createdByUserId',
    createdByUser: 'createdByUser',
    subjectId: 'subjectId',
    subjectType: 'subjectType',
};
exports.CommentAssociations = {};
exports.Comment = _Base_1.sequelize.define('comment', {
    [exports.CommentFields.id]: {
        type: sequelize_1.DataTypes.CHAR(50),
        primaryKey: true
    },
    [exports.CommentFields.content]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.CommentFields.createdByUserId]: {
        type: sequelize_1.DataTypes.CHAR(50)
    },
    [exports.CommentFields.subjectId]: {
        type: sequelize_1.DataTypes.CHAR(50)
    },
    [exports.CommentFields.subjectType]: {
        type: sequelize_1.DataTypes.CHAR(50)
    },
}, {
    indexes: [
        {
            unique: false,
            fields: [
                exports.CommentFields.subjectType
            ]
        },
        {
            unique: false,
            fields: [
                exports.CommentFields.subjectId
            ]
        },
        {
            unique: false,
            fields: [
                exports.CommentFields.createdByUserId
            ]
        }
    ]
});
//# sourceMappingURL=Comment.js.map