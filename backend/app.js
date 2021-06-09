const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError");
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

app.use(express.json());

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