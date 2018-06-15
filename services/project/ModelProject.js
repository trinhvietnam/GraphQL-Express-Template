"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../../databases/Project");
class ModelProject {
    static async get(id) {
        var project = await Project_1.Project.findById(id);
        return project;
    }
    static async create(json, id) {
        json[Project_1.ProjectFields.id] = id;
        await Project_1.Project.create(json);
        return await Project_1.Project.findById(id);
    }
    static async getList() {
        return await Project_1.Project.findAll();
    }
    static async getProjectOfUser(userId) {
        return await Project_1.Project.findAll().filter(p => {
            if (p[Project_1.ProjectFields.leaderId] == userId)
                return true;
            if (p[Project_1.ProjectFields.partnerIds] && p[Project_1.ProjectFields.partnerIds].includes(userId))
                return true;
        });
    }
    static async update(json, id) {
        await Project_1.Project.update(json, {
            where: {
                [Project_1.ProjectFields.id]: id
            }
        });
        return await Project_1.Project.findById(id);
    }
}
exports.ModelProject = ModelProject;
//# sourceMappingURL=ModelProject.js.map