'use strict';

const conexion = require('./Conection');

//ingresar seguido
const addFollow = (follow, callback) => {
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

//comprobar seguimiento
const chechkFollow = (id, id2, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM seguir WHERE id_usuario_seguido = ${conexion.escape(id)} AND id_usuario_seguidor = ${conexion.escape(id2)}`, (err, res) => {
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

//dejar de seguir
const unFollow = (id, id2, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM seguir WHERE id_usuario_seguido = ${conexion.escape(id)} AND id_usuario_seguidor = ${conexion.escape(id2)}`, (err, res) => {
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

//usuarios que se suige
const getFollowUsers = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.avatar,seguir.id_usuario_seguidor FROM seguir INNER JOIN usuarios ON seguir.id_usuario_seguido = usuarios.id_usuario WHERE seguir.id_usuario_seguidor = ${conexion.escape(id)}`, (err, res) => {
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
        addFollow,
        chechkFollow,
        unFollow,
        getFollowUsers
    }