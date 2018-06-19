"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./databases/User");
const SchemaUser_1 = require("./services/user/SchemaUser");
const SchemaProject_1 = require("./services/project/SchemaProject");
const Project_1 = require("./databases/Project");
const Comment_1 = require("./databases/Comment");
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
var app = express();
User_1.User.sync({ force: false });
Project_1.Project.sync({ force: false });
Comment_1.Comment.sync({ force: false });
app.use('/user', bodyParser.json(), graphqlExpress((req, res) => ({ schema: SchemaUser_1.default, context: req })));
// GraphiQL, a visual editor for queries
app.use('/graphiqlUser', graphiqlExpress({ endpointURL: '/user' }));
app.use('/project', bodyParser.json(), graphqlExpress((req, res) => ({ schema: SchemaProject_1.default, context: req })));
// GraphiQL, a visual editor for queries
app.use('/graphiqlProject', graphiqlExpress({ endpointURL: '/project' }));
// Start the server
app.listen(8000, () => {
    console.log('Go to http://localhost:8000/graphiqlUser to run queries!');
    console.log('Go to http://localhost:8000/graphiqlProject to run queries!');
});
//# sourceMappingURL=server.js.map