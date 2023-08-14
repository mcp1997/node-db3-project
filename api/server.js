const express = require('express');
const helmet = require('helmet')

const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use(helmet())
server.use(logger)

server.use('/api/schemes', SchemeRouter);

server.use('*', (req, res) => {
  res.status(404).json({
    message: "the resource you are looking for does not exist"
  })
})

module.exports = server;