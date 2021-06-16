"user strict"

const db = require('../db');
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Game{

    static async saveGame(score,winner){

        const result = await db.query(
            `INSERT INTO games
            (score, winner)
            VALUES ($1, $2)
            RETURNING id, score,winner`,
        [ score, winner]);

        return result.rows[0];
    }
}

module.exports = Game;