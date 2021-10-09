const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'danieljesus',
    password: 'Dd@jc13.24M.D',
    database: 'hde_db'
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