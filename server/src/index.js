// Express Server Creation
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const {ErrorHandler} = require('./middlewares/ErrorHandler');

const port = process.env.PORT;

// Routers Declarations
const raidLeagueRouter = require('./routers/raidLeagueRouter');

// Cors white list and JSON
app.use(cors());
app.use(express.json());

// Routers
app.use(raidLeagueRouter);
app.use(ErrorHandler);


//***********************************  Sockets  ************************************ */

const { handleConnection } = require('./sockets/socketsEvents');

// Socket Configuration
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET','POST'],
    credentials: true
  }
});
handleConnection(io);

server.listen(port , async ()=>{ console.log(`Server is online and listening to port: ${port}.`) });