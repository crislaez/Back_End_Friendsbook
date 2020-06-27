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
}
module.exports = 
    {
        addImage,
        getImageByIdUser
    }