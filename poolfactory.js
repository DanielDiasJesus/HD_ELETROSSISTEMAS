const mysql = require('mysql');
const env = require('dotenv');

env.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
}

const pool = mysql.createPool(dbConfig);

console.log("[*][POOL] CRIADO COM SUCESSO");

pool.on('release', () => console.log('[*][POOL] CONEXÃO RETORNADA'));

process.on('SIGINT', () =>
    pool.end(err => {
        if (err) return console.log(err);
        console.log('[!][POOL] FECHADO');
        process.exit(0);
    })
);

module.exports = pool;