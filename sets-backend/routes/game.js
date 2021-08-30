"use strict"

const express = require("express");
const router = new express.Router();
const Game = require('../models/game')

router.get("/all", async function(req,res,next){

    try{
        let result = await Game.getAll();
        return res.json(result);
    }
    catch(error){
        console.log('error: ', error);
        return res.json({'msg':'Game Save failed', 'error': error});
    }

});

module.exports = router;
