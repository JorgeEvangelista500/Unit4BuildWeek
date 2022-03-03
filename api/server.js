const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require('./auth/auth-router')
const recipeRouter = require('./class/class-router')
const { restrict } = require('./auth/auth-middleware')
const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/register', authRouter);
server.use('/api/recipe', restrict, recipeRouter );

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server
