"use strict"

const SECRET_KEY = process.env.SECRET_KEY || "5h00p3R-5h3cR3+847362a%$^0";
const PORT = +process.env.PORT || 5000;
require("colors");

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? "sets_test"
        : process.env.DATABASE_URL || "sets";
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {SECRET_KEY, PORT, getDatabaseUri, BCRYPT_WORK_FACTOR};