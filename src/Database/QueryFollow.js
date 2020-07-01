'use strict';

const conexion = require('./Conection');

const adFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO seguir SET ?`, follow, (err, res) =>{
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        adFollow
    }