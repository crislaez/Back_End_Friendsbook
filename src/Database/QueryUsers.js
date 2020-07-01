'use strict';

const conexion = require('./Conection');

//mostrar todos los usuarios
const getAllUsers = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios`, (err, res) => {
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

//ingresar usuarios
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`,user, (err, res) => {
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

//login
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(user.correo)} AND clave = ${conexion.escape(user.clave)}`, (err, res) => {
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

//usuario por id
const getUserById = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
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
// SELECT * FROM `usuarios` WHERE nombre = '' OR apellido = ''
//buscar usuarios
const getUserBySearch = (nombre, apellido, callback) =>{
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT id_usuario, avatar, nombre, apellido  FROM usuarios WHERE nombre LIKE ${conexion.escape(nombre)} OR apellido LIKE ${conexion.escape(apellido)}`, (err, res) => {
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
        getAllUsers,
        addUser,
        login,
        getUserById,
        getUserBySearch
    }