const express = require('express');
const env = process.env.NODE_ENV || 'development';
const app = express();
const config = require('./config/config')[env];

require('./services/express')(app, config);
require('./routes/index')(app);
require('./routes/crypto')(app);

app.listen(process.env.PORT || 9001);

console.log("Server running on: " + "http://localhost:" + config.port);

// import http from 'http'
// import { env, port, ip, apiRoot } from './config'
// import express from './services/express'
// import api from './api'
//
// const app = express(apiRoot, api)
// const server = http.createServer(app)
//
// setImmediate(() => {
//   server.listen(port, ip, () => {
//     console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
//   })
// })
// export default app


// index.js
// require('babel-core/register')
// exports = module.exports = require('./app')
