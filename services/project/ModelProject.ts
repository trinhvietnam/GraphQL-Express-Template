import {Project, ProjectFields} from "../../databases/Project";

export class ModelProject {
    static async get(id) {
        var project = await Project.findById(id);
        return project;
    }

    static async create(json, id) {
        json[ProjectFields.id] = id;
        await Project.create(json);
        return await Project.findById(id);
    }

    static async getList() {
        return await Project.findAll();
    }

    static async getProjectOfUser(userId) {
        return await Project.findAll().filter(p => {
            if (p[ProjectFields.leaderId] == userId) return true;
            if (p[ProjectFields.partnerIds] && p[ProjectFields.partnerIds].includes(userId)) return true;
        });
    }
    static async update(json, id) {
        await Project.update(json, {
            where: {
                [ProjectFields.id]: id
            }
        })
        return await Project.findById(id);
    }
}