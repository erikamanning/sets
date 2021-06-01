const express = require("express");
const app = express();

const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/users', usersRoutes);


app.get('/', (req,res)=>{

    res.send('Home Page Wut Wut');
});

module.exports = app;