const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'danieljesus',
    password: 'Dd@jc13.24M.D',
    database: 'hde_db'
}

const pool = mysql.createPool(dbConfig);

console.log("[* PoolFactory] Pool criada com sucesso!");

pool.on('release', () => console.log('[* PoolFactory] conexão retornada'));

process.on('SIGINT', () =>
    pool.end(err => {
        if (err) return console.log(err);
        console.log('[! PoolFactory] Pool fechado');
        process.exit(0);
    })
);

module.exports = pool;