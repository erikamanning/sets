const express = require("express");
const app = express();

app.get('/', (req,res)=>{

    res.send('Home Page Wut Wut');
});

module.exports = app;