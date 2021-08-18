"user strict"

const db = require('../db');
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }
    static async authenticate(username,password){
        const result = await db.query(`
            SELECT  username, 
                    password 
            FROM users 
            WHERE username=$1`,
        [username]);

        const user = result.rows[0];

        console.log('USER: ', user);

        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid === true){
                delete user.password;
                return user;
            }
        }
        throw new Error("Invalid username/password");

    }
    static async register(username, password){

        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
          [username],
        );

        if (duplicateCheck.rows[0]) {
            throw new Error(`Duplicate username: ${username}`);
        }
        console.log('bcrypt work factor: ', BCRYPT_WORK_FACTOR);
        console.log('username: ',username);
        console.log('password: ',password);

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        console.log('7777777777777777777777');
        console.log('hashed password: ', hashedPassword);

        const result = await db.query(
            `INSERT INTO users
            (username, password)
            VALUES ($1, $2)
            RETURNING username`,
        [ username, hashedPassword]);

        const user = result.rows[0];
        return user;
    }
}

module.exports = User;