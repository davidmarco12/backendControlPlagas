const mysql = require('mysql');
const {promisify} = require('util');
const { DB } = require('../environments');

const pool = mysql.createPool(DB);
pool.getConnection((err, connection)=>{
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
                console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
        if(err.code === 'ER_ACCESS_DENIED_ERROR'){
            console.error('Problemas con los certificado de la base de datos');
        }
        if(err.code === 'ER_USER_LIMIT_REACHED'){
            console.error('Conexion limitada');
        }
    }
    if(connection) connection.release();
    console.log('DB is CONNECTED');
    return;
});


pool.query = promisify(pool.query);


module.exports = pool;