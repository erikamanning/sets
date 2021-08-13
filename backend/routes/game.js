"use strict"

const express = require("express");
const router = new express.Router();
const Game = require('../models/game')


router.post("/save", async function(req,res,next){

    try{
        let { gameId,gameResult,mode, players } = req.body;
        console.log('gameId: ', gameId);
        console.log('gameResult: ', gameResult);
        console.log('mode: ', mode);
        let gameSaveResult = await Game.saveGame(gameId,gameResult,mode);
        let userGameSaveResult = await Game.saveUserGame(gameId,players);
        return res.json({gameSaveResult,userGameSaveResult});
    }
    catch(error){
        console.log('error: ', error);
        return res.json({'msg':'Game Save failed', 'error': error});
    }

});

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
