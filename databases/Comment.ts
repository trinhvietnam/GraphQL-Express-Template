import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';

export const CommentFields = {
    id: 'id',
    content: 'content',
    createdByUserId: 'createdByUserId',
    createdByUser: 'createdByUser',
    objectId: 'objectId',
    objectType: 'objectType',
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
        [CommentFields.objectId]: {
            type: DataTypes.CHAR(50)
        },
        [CommentFields.objectType]: {
            type: DataTypes.CHAR(50)
        },
    },
    {
        indexes: [
            {
                unique: false,
                fields: [
                    CommentFields.objectType
                ]
            },
            {
                unique: false,
                fields: [
                    CommentFields.objectId
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

