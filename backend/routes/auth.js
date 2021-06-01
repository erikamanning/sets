"use strict";

const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const userAuthSchema = require("../schemas/userAuth.json");
const { createToken }  = require('../helpers/token');
const User = require("../models/user");

router.post("/token", async function (req, res, next) {

    try{

        const validator = jsonschema.validate(req.body, userAuthSchema);
        if(!validator.valid){

            console.log('**********not valid************');
            const errs = validator.errors.map(e => e.stack);
            console.log('Errs: ', errs);
            throw new Error(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username,password);
        
        const token = createToken(user);
        return res.json({ token });
    }
    catch(err){
        console.log('error: ', err);
        res.json({'msg':'Authentication failed', 'err': err});
    }

});

router.post("/register", async function (req, res, next) {

    try{

        const validator = jsonschema.validate(res.body,userAuthSchema);

        if(!validator.valid){

            const errs = validator.errors.map(e=>e.stack);
            console.log('Errs: ', errs);
            throw new Error(errs);
        }

        const { username, password } = req.body;
        const user = await User.register(username,password);
        const token = createToken(user);

        return res.json({ token });
    }
    catch(err){
        console.log('error: ', err);
        res.json({'msg':'Registration failed', 'err': err});    }
});

module.exports = router;
