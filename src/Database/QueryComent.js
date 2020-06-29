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

module.exports = 
    {
        addComent
    }