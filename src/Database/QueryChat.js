'use strict';

const conexion = require('./Conection');

//agregar mensaje chat
const addChat = (chat, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO chat SET ?`,chat, (err, res) => {
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

//todos los mensajes de chat de 2 usuarios
const getChatByIdUSers = (idUno, idDos, calback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT chat.id_chat, chat.id_usuario_uno, chat.id_usuario_dos, chat.mensaje, usuarios.id_usuario, usuarios.avatar  FROM chat INNER JOIN usuarios ON chat.id_usuario_dos = usuarios.id_usuario WHERE chat.id_usuario_uno = ${conexion.escape(idUno)} AND chat.id_usuario_dos = ${conexion.escape(idDos)} OR chat.id_usuario_uno = ${conexion.escape(idDos)} AND chat.id_usuario_dos = ${conexion.escape(idUno)}`,(err, res) => {
            if(err){
                console.log(err.code);
                calback(err, res);
            }else{
                calback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        addChat,
        getChatByIdUSers
    }