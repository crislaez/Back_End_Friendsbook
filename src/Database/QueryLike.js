'use strict';

const conection = require('./Conection');

//dar like
const addLike = (like, callback) => {
    // conection.connect();
    if(conection){
        conection.query(`INSERT INTO megusta SET ?`,like, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conection.end();
}

//comprobar like
const checkLike = (like, callback) => {
    // conection.connect();
    if(conection){
        conection.query(`SELECT * FROM megusta WHERE id_imagenes = ${conection.escape(like.id_imagenes)} AND id_usuario = ${conection.escape(like.id_usuario)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conection.end();
}

//quitar like
const removeLike = (like, callback) => {
    // conection.connect();
    if(conection){
        conection.query(`DELETE FROM megusta WHERE id_imagenes = ${conection.escape(like.id_imagenes)} AND id_usuario = ${conection.escape(like.id_usuario)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conection.end();
}

module.exports = 
    {
        addLike,
        checkLike,
        removeLike
    }