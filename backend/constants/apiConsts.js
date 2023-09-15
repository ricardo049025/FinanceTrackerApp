const env = require('dotenv');
env.config();

module.exports = Object.freeze({
    DBNAME: process.env.DB_NAME,
    JWT_KEY: process.env.JWT_KEY,
    PORTAPI: process.env.PORT,
});