' use strict';

const conexion = require('./Conection');

//ingresar imagen
const addImage = (image, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO imagenes SET ?`, image, (err, res) => {
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

//mostrar todas las imagenes por usuario
const getImageByIdUser = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM imagenes INNER JOIN usuarios ON imagenes.id_usuario = usuarios.id_usuario WHERE imagenes.id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//mostrar un imagen
const getImageByIdImage = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT imagenes.id_imagenes, imagenes.imagen, imagenes.fecha_imagen, imagenes.titulo_imagen, usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.avatar FROM imagenes INNER JOIN usuarios ON imagenes.id_usuario = usuarios.id_usuario WHERE id_imagenes = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//borrar foto por ide
const deteleImageByIdImage = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE from imagenes WHERE id_imagenes = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//conseguir todas las imagenes
const getAllImage = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT imagenes.id_imagenes, imagenes.id_usuario, imagenes.imagen, imagenes.titulo_imagen, imagenes.fecha_imagen, usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.avatar  FROM imagenes INNER JOIN usuarios ON imagenes.id_usuario = usuarios.id_usuario`, (err, res) => {
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
        addImage,
        getImageByIdUser,
        getImageByIdImage,
        deteleImageByIdImage,
        getAllImage
    }