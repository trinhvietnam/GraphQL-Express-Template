"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = require('sequelize');
exports.Op = exports.Sequelize.Op;
exports.sequelize = new exports.Sequelize({
    database: 'graphql',
    username: 'root',
    password: null,
    dialect: 'mysql',
    host: '127.0.0.1'
});
//# sourceMappingURL=_Base.js.map