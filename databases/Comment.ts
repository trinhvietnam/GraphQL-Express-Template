import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';

export const CommentFields = {
    id: 'id',
    content: 'content',
    createdByUserId: 'createdByUserId',
    createdByUser: 'createdByUser',
    subjectId: 'subjectId',
    subjectType: 'subjectType',
};
export const CommentAssociations = {};
export const Comment = sequelize.define('comment',
    {
        [CommentFields.id]: {
            type: DataTypes.CHAR(50),
            primaryKey: true
        },

        [CommentFields.content]: {
            type: DataTypes.TEXT
        },
        [CommentFields.createdByUserId]: {
            type: DataTypes.CHAR(50)
        },
        [CommentFields.subjectId]: {
            type: DataTypes.CHAR(50)
        },
        [CommentFields.subjectType]: {
            type: DataTypes.CHAR(50)
        },
    },
    {
        indexes: [
            {
                unique: false,
                fields: [
                    CommentFields.subjectType
                ]
            },
            {
                unique: false,
                fields: [
                    CommentFields.subjectId
                ]

            },
            {
                unique: false,
                fields: [
                    CommentFields.createdByUserId
                ]

            }
        ]
    }
);

