"user strict"

const db = require('../db');

async function insertUserGame(username, gameId, userResult,userScore){
    const result = await db.query(
        `INSERT INTO user_games
        (username, game_id, user_result,user_score)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, game_id, user_result,user_score`,
    [username, gameId, userResult,userScore]);

    return result.rows[0];
}

async function insertGuestGame(username, gameId, userResult,userScore){
    const result = await db.query(
        `INSERT INTO user_games
        (username, game_id, user_result,user_score)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, game_id, user_result,user_score`,
    [username, gameId, userResult,userScore]);

    return result.rows[0];
}

class Game{

    static async saveGame(gameId,gameResult,mode){

        const result = await db.query(
            `INSERT INTO games
            (id,gameResult,mode)
            VALUES ($1, $2, $3)
            RETURNING id, gameResult,mode`,
        [ gameId,gameResult,mode]);

        return result.rows[0];
    }

    static async saveUserGame(gameId, players){
        console.log('********** hello from the saveUserGame!!!')
        console.log('players: ', players)

        const promArr = [];

        for(let playerKey of Object.keys(players)){
            console.log('********** hello from the saveUserGame for loop!!!')
            console.log('playa playaaaaa: ',players[playerKey]);
            const {username,score,playerResult} = players[playerKey];

            promArr.push(insertUserGame(username, gameId, playerResult,score));
        }

        return Promise.all(promArr).then((values) => {
            console.log('values: ',values);
            return values;
        });

    }

    static async getAll(){

        // const result = await db.query(
        //         `SELECT users.username, COUNT(user_result) 
        //          FROM users 
        //          JOIN user_games 
        //          ON users.username=user_games.username 
        //          WHERE user_result='win' 
        //          GROUP BY users.username 
        //          ORDER BY count(user_result) 
        //          DESC LIMIT(5)`,
        // );

        // version without needing to register account
        const result = await db.query(
            `SELECT username, COUNT(user_result) 
             FROM user_games 
             GROUP BY username 
             ORDER BY count(user_result) 
             DESC LIMIT(5)`
        );
    
        return result.rows;
          
    }
    


}

module.exports = Game;