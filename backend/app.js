const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);


// NOT FOUND ERROR HANDLING
app.use(function(err,req,res,next){

    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

module.exports = app;