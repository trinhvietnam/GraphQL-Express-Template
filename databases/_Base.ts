export const Sequelize = require('sequelize');
export const Op = Sequelize.Op;
export const sequelize = new Sequelize({
    database: 'graphql',
    username: 'root',
    password: null,
    dialect: 'mysql',
    host:'127.0.0.1'
});
