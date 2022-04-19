const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();
const server = http.createServer(app);

/** Establish new WS server */
const io = new Server(server, {});

io.on('connection', (socket) => {
  console.log(`socket connected: ${socket.id}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(SERVER_PORT, () =>
  console.log(`Listening on PORT: ${SERVER_PORT}`)
);