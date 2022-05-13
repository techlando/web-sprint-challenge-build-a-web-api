const express = require('express');
const server = express();
const projectRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const { 
    logger,
     } = require('./projects/projects-middleware')
// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use(logger)

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionsRouter)


module.exports = server;
