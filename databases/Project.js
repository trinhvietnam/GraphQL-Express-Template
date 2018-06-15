"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Base_1 = require("./_Base");
const sequelize_1 = require("sequelize");
exports.ProjectFields = {
    id: 'id',
    name: 'name',
    leaderId: 'leaderId',
    leader: 'leader',
    partnerIds: 'partnerIds',
    partners: 'partners',
    comments: 'comments'
};
exports.ProjectAssociations = {};
exports.Project = _Base_1.sequelize.define('project', {
    [exports.ProjectFields.id]: {
        type: sequelize_1.DataTypes.CHAR(50),
        primaryKey: true
    },
    [exports.ProjectFields.name]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.ProjectFields.leaderId]: {
        type: sequelize_1.DataTypes.CHAR(50)
    },
    [exports.ProjectFields.partnerIds]: {
        type: sequelize_1.DataTypes.TEXT,
        set(val) {
            this.setDataValue(exports.ProjectFields.partnerIds, JSON.stringify(val));
        },
        get() {
            if (this.getDataValue(exports.ProjectFields.partnerIds)) {
                return JSON.parse(this.getDataValue(exports.ProjectFields.partnerIds));
            }
        }
    },
}, {
    indexes: [
        {
            unique: false,
            fields: [
                exports.ProjectFields.leaderId
            ]
        }
    ]
});
//# sourceMappingURL=Project.js.map