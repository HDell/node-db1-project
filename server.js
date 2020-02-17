const express = require('express');

const db = require('./data/dbConfig.js');

const myRoute = require('./router.js');

const server = express();

server.use(express.json());

server.use('/api/', myRoute);

module.exports = server;