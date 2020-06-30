'use state';

const conexion = require('./Conection');

//ingresar comentarios
const addComent = (coment, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO comentarios SET ?`,coment, (err, res) => {
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

//mostrar todos los comentarios por ide de foto
const getComentsByIdImage = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT comentarios.id_comentario, comentarios.texto_comentario, usuarios.id_usuario, usuarios.nombre, usuarios.apellido, usuarios.avatar  FROM comentarios INNER JOIN usuarios ON comentarios.id_usuario = usuarios.id_usuario WHERE comentarios.id_imagen = ${conexion.escape(id)}`, (err, res) => {
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
        addComent,
        getComentsByIdImage
    }