"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../databases/User");
const _Base_1 = require("../../databases/_Base");
class ModelUser {
    static async get(id) {
        return await User_1.User.findById(id);
    }
    static async list() {
        return await User_1.User.findAll();
    }
    static async update(json, id) {
        await User_1.User.update(json, {
            where: {
                [User_1.UserFields.id]: id
            }
        });
        return await User_1.User.findById(id);
    }
    static async create(json, id) {
        json[User_1.UserFields.id] = id;
        await User_1.User.create(json);
        return User_1.User.findById(id);
    }
    static async getSimples(ids) {
        return await User_1.User.findAll({
            where: {
                [User_1.UserFields.id]: {
                    [_Base_1.Op.in]: ids
                }
            }
        });
    }
}
exports.ModelUser = ModelUser;
//# sourceMappingURL=ModelUser.js.map