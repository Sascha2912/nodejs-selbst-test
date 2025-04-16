'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Routes importieren
const { getTodos } = require('./routes/getTodos');
const { markTodoAsDone } = require('./routes/markTodoAsDone');
const { markTodoAsOpen } = require('./routes/markTodoAsOpen');
const { noteTodo } = require('./routes/noteTodo');

const getApi = function({ store }) {
    const api = express();
    api.use(cors());
    api.use(bodyParser.json());

    // Routes definieren
    api.get('/', function(req, res) {
        res.json({
            message: 'Hello from the server.'
        });
    });

    // Commands
    api.post('/note-todo', noteTodo({ store }));
    api.post('/mark-todo-as-done/:id', markTodoAsDone({ store }));
    api.post('/mark-todo-as-open/:id', markTodoAsOpen({ store }));

    // Queries
    api.get('/todos', getTodos({ store }));

    return api;
};

module.exports = { getApi };
