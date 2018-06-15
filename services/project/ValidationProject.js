"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../../databases/Project");
exports.VALIDATION_CREATE_PROJECT = `
    ${Project_1.ProjectFields.name}: String!
`;
exports.VALIDATION_UPDATE_PROJECT = `
    ${Project_1.ProjectFields.id}: String!
    ${Project_1.ProjectFields.name}: String,
    ${Project_1.ProjectFields.leaderId}: String,
    ${Project_1.ProjectFields.partnerIds}: [String!],
`;
//# sourceMappingURL=ValidationProject.js.map