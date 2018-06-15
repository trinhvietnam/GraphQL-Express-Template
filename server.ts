import {User} from "./databases/User";
import SchemaUser from "./services/user/SchemaUser";
import SchemaProject from "./services/project/SchemaProject";
import {Project} from "./databases/Project";
const express = require('express');
const bodyParser = require('body-parser');
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
var app = express();

User.sync({force: false});
Project.sync({force: false});

app.use('/user', bodyParser.json(), graphqlExpress((req, res) => ({schema: SchemaUser, context: req})));
// GraphiQL, a visual editor for queries
app.use('/graphiqlUser', graphiqlExpress({endpointURL: '/user'}));

app.use('/project', bodyParser.json(), graphqlExpress((req, res) => ({schema: SchemaProject, context: req})));
// GraphiQL, a visual editor for queries
app.use('/graphiqlProject', graphiqlExpress({endpointURL: '/project'}));

// Start the server
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiqlUser to run queries!');
    console.log('Go to http://localhost:3000/graphiqlProject to run queries!');
});