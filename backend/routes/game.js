"use strict"

const express = require("express");
const router = new express.Router();
const Game = require('../models/game')


router.post("/save", async function(req,res,next){

    try{
        const { score, winner } = req.body;
        console.log('score: ', score);
        console.log('winner: ', winner);
        let result = await Game.saveGame(score,winner);
        return res.json(result);
    }
    catch(error){
        console.log('error: ', error);
        return res.json({'msg':'Game Save failed', 'err': err});
    }

});

module.exports = router;
