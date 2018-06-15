import {User, UserFields} from "../../databases/User";
import {Op} from "../../databases/_Base";

export class ModelUser {
    static async get(id) {
        return await User.findById(id);
    }
    static async list() {
        return await User.findAll();
    }

    static async update(json, id) {
        await User.update(json, {
            where: {
                [UserFields.id]: id
            }
        })
        return await User.findById(id);
    }

    static async create(json, id) {
        json[UserFields.id] = id;
        await User.create(json);
        return User.findById(id);
    }

    static async getSimples(ids) {
        return await User.findAll({
            where: {
                [UserFields.id]: {
                    [Op.in]: ids
                }
            }
        });
    }
}