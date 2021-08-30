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

async function insertGuestGame(guestName, gameId, guestResult,guestScore){
    const result = await db.query(
        `INSERT INTO guest_games
        (guest_name, game_id, guest_result,guest_score)
        VALUES ($1, $2, $3, $4)
        RETURNING id, guest_name, game_id, guest_result,guest_score`,
    [guestName, gameId, guestResult,guestScore]);

    return result.rows[0];
}

class Game{

    static async save(gameId,gameResult,mode){

        const result = await db.query(
            `INSERT INTO games
            (id,gameResult,mode)
            VALUES ($1, $2, $3)
            RETURNING id, gameResult,mode`,
        [ gameId,gameResult,mode]);

        return result.rows[0];
    }

    static async savePlayerData(gameId, players, playerLog){
        console.log('********** hello from the saveUserGame!!!')
        // console.log('player LOG: ', playerLog);
        console.log('players: ', players);

        const promArr = [];
        const playerKeys = Array.from(players.keys())
        console.log('playerKeys: ',playerKeys);
        for(let playerKey of playerKeys){
            console.log('player key: ', playerKey);
            const currentPlayer = players.get(playerKey);
            console.log('player: ', currentPlayer.username);
            if(playerLog[playerKey].loggedIn)
                promArr.push(insertUserGame(currentPlayer.username, gameId, currentPlayer.playerResult,currentPlayer.score));
            else
                promArr.push(insertGuestGame(currentPlayer.username, gameId, currentPlayer.playerResult,currentPlayer.score));
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