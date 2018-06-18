"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _Base_1 = require("./_Base");
const sequelize_1 = require("sequelize");
exports.UserFields = {
    id: 'id',
    name: 'name',
    noSignName: 'noSignName',
    firstName: 'firstName',
    lastName: 'lastName',
    age: 'age',
    avatar: 'avatar',
    cover: 'cover',
    address: 'address',
    district: 'district',
    city: 'city',
    country: 'country',
    email: 'email',
    phone: 'phone',
    isValidatedPhone: 'isValidatedPhone',
    isValidatedEmail: 'isValidatedEmail',
    language: 'language',
    type: 'type',
    loginAt: 'loginAt',
    projects: 'projects',
};
exports.UserAssociations = {};
exports.User = _Base_1.sequelize.define('user', {
    [exports.UserFields.id]: {
        type: sequelize_1.DataTypes.CHAR(50),
        primaryKey: true
    },
    [exports.UserFields.name]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.firstName]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.lastName]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.avatar]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.cover]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.address]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.district]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.city]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.country]: {
        type: sequelize_1.DataTypes.TEXT
    },
    [exports.UserFields.email]: {
        type: sequelize_1.DataTypes.CHAR(50)
    },
    [exports.UserFields.phone]: {
        type: sequelize_1.DataTypes.CHAR(20)
    },
    [exports.UserFields.isValidatedPhone]: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    [exports.UserFields.isValidatedEmail]: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    [exports.UserFields.language]: {
        type: sequelize_1.DataTypes.CHAR(20)
    },
    [exports.UserFields.type]: {
        type: sequelize_1.DataTypes.TEXT,
        set(val) {
            this.setDataValue(exports.UserFields.type, JSON.stringify(val));
        },
        get() {
            if (this.getDataValue(exports.UserFields.type)) {
                return JSON.parse(this.getDataValue(exports.UserFields.type));
            }
        }
    },
    [exports.UserFields.noSignName]: {
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    indexes: [
        {
            unique: false,
            fields: [
                exports.UserFields.email
            ]
        }
    ]
});
exports.User.beforeSave((user, options) => {
    if (user[exports.UserFields.name]) {
        user.noSignName = user[exports.UserFields.name];
    }
});
exports.User.beforeBulkUpdate((query, instanse) => {
    if (query.attributes[exports.UserFields.name]) {
        query.fields.push(exports.UserFields.noSignName);
        query.attributes[exports.UserFields.noSignName] = query.attributes[exports.UserFields.name];
    }
});
//# sourceMappingURL=User.js.map