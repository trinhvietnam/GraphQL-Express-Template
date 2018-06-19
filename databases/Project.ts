import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';
import {GraphQLType} from "../graphql/GraphQLType";

export const ProjectFields = {
    id: 'id',
    name: 'name',
    info: 'info',
    leaderId: 'leaderId',
    leader: 'leader',
    partnerIds: 'partnerIds',
    partners: 'partners',
    comments: 'comments'
};

export const ProjectAssociations = {};
export const Project = sequelize.define('project',
    {
        [ProjectFields.id]: {
            type: DataTypes.CHAR(50),
            primaryKey: true
        },

        [ProjectFields.name]: {
            type: DataTypes.TEXT
        },
        [ProjectFields.leaderId]: {
            type: DataTypes.CHAR(50)
        },
        [ProjectFields.partnerIds]: {
            type: DataTypes.TEXT,
            set(val) {
                this.setDataValue(ProjectFields.partnerIds, JSON.stringify(val));
            },
            get() {
                if (this.getDataValue(ProjectFields.partnerIds)) {
                    return JSON.parse(this.getDataValue(ProjectFields.partnerIds));
                }
            }
        },
    },
    {
        indexes: [
            {
                unique: false,
                fields: [
                    ProjectFields.leaderId
                ]
            }
        ]
    }
);
