import {sequelize} from "./_Base";
import {DataTypes} from 'sequelize';
import {GraphQLType} from "../graphql/GraphQLType";

export const UserFields = {
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

export const UserAssociations = {};
export const User = sequelize.define('user',
    {
        [UserFields.id]: {
            type: DataTypes.CHAR(50),
            primaryKey: true
        },

        [UserFields.name]: {
            type: DataTypes.TEXT
        },
        [UserFields.firstName]: {
            type: DataTypes.TEXT
        },
        [UserFields.lastName]: {
            type: DataTypes.TEXT
        },
        [UserFields.avatar]: {
            type: DataTypes.TEXT
        },

        [UserFields.cover]: {
            type: DataTypes.TEXT
        },
        [UserFields.address]: {
            type: DataTypes.TEXT
        },
        [UserFields.district]: {
            type: DataTypes.TEXT
        },
        [UserFields.city]: {
            type: DataTypes.TEXT
        },
        [UserFields.country]: {
            type: DataTypes.TEXT
        },
        [UserFields.email]: {
            type: DataTypes.CHAR(50)
        },
        [UserFields.phone]: {
            type: DataTypes.CHAR(20)
        },
        [UserFields.isValidatedPhone]: {
            type: DataTypes.BOOLEAN
        },
        [UserFields.isValidatedEmail]: {
            type: DataTypes.BOOLEAN
        },
        [UserFields.language]: {
            type: DataTypes.CHAR(20)
        },

        [UserFields.type]: {
            type: DataTypes.TEXT,
            set(val) {
                this.setDataValue(UserFields.type, JSON.stringify(val));
            },
            get() {
                if (this.getDataValue(UserFields.type)) {
                    return JSON.parse(this.getDataValue(UserFields.type));
                }
            }
        },
        [UserFields.noSignName]: {
            type: DataTypes.TEXT
        }

    },
    {
        indexes: [
            {
                unique: false,
                fields: [
                    UserFields.email
                ]
            }
        ]
    }
);
User.beforeSave((user, options) => {
    if (user[UserFields.name]) {
        user.noSignName =user[UserFields.name];
    }
});
User.beforeBulkUpdate((query, instanse) => {
    if (query.attributes[UserFields.name]) {
        query.fields.push(UserFields.noSignName);
        query.attributes[UserFields.noSignName] = query.attributes[UserFields.name];
    }
});

