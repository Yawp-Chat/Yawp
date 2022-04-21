const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const apiRouter = require('./routers/api'); 
dotenv.config();

const { SERVER_PORT, CLIENT_PORT } = process.env;

const app = express();

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static('public'));

app.use('/api', apiRouter); 

/** Establish new WS server */
/** Handle CORS */
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
  },
});

io.on('connection', (socket) => {
  console.log(`socket connected: ${socket.id}`);

  /** handle msg:post event */
  socket.on('msg:post', ({ msg, currentUser }) => {
    const username = currentUser
    console.log('message sent:', msg, username);
    io.emit('msg:get', { msg, username });
  });
  /** log connection errors */
  socket.on('connect_error', (err) => {
    console.log('connection error due to:', err);
  });
});


/** Redirect to root for react router */
app.use('/home', (req, res) => {
  res.redirect('/');
});

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

// module.exports = app; 