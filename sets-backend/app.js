// Colyseus + Express
const colyseus = require("colyseus");
const monitor = require("@colyseus/monitor").monitor;
const http = require("http");
// const port = process.env.port || 5000;
const {GameRoom} = require('./rooms/GameRoom');

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const gameRoutes = require('./routes/game')

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/game', gameRoutes);

app.get('/', ( req, res, next)=>{

  res.send('backend with colyseus connected!');

});

// NOT FOUND ERROR HANDLING
app.use(function(req,res,next){
    console.log('============ uh okaythen');
    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  console.log('============== ', 'status:', status, 'message: ', message);

    let resText = {
      error: { message, status },
    };
    return res.status(status).json(resText);
  });

// (optional) attach web monitoring panel
app.use('/colyseus', monitor());

const gameServer = new colyseus.Server({  server: http.createServer(app)
});

gameServer.define("sets_singleplayer", GameRoom, {mode:'singleplayer',maxClients:1, minPlayers:1}).enableRealtimeListing();
gameServer.define("sets_multiplayer", GameRoom,{mode:'multiplayer', minPlayers:2} ).enableRealtimeListing();

// (optional) attach web monitoring panel
app.use('/colyseus', monitor());

// module.exports = app;
module.exports = gameServer;