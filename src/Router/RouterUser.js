'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const authFunction = require('../Middleware/Auth');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../Img'})/// ./img es pa carpeta donde se subira la foto

const Database = require('../Database/QueryUsers');

function endPointRouterUser(router){

    //mostrar todos los usuarios ruta -> http://localhost:3001/api/getAllUsers
    router.get('/getAllUsers',(req, res) => {
        Database.getAllUsers((err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({message: `Error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //agregar usuario ruta -> http://localhost:3001/api/addUser
    router.post('/addUser',multipartMiddleware, (req, res) => {
        let aux = req.files.avatar.path.split('\\');
        let aux2 = req.files.banner.path.split('\\');
        let num = aux.length;
        let num2 = aux2.length;
        let user = 
            {
                id_usuario:'',
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                correo:req.body.correo,
                clave:req.body.clave,
                nacimiento:req.body.nacimiento,
                sexo:req.body.sexo,
                avatar:process.env.RUTA+'/Img/'+aux[num-1],
                banner:process.env.RUTA+'/Img/'+aux2[num2-1]
            }

        Database.addUser(user, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({message: `Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    })
}

module.exports = endPointRouterUser;