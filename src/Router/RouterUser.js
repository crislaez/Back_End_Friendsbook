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
            if(err) return res.status(500).json({success: false, message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({success: false, message: `Error al devolver los datos`});

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
            if(err) return res.status(500).json({success: false, message: `Error al realizar la peticion$:${err}`});
            if(!data) return res.status(404).json({success: false, message: `Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    });

    //login ruta -> http://localhost:3001/api/login
    router.post('/login', (req, res) => {
        let user = 
            {
                correo:req.body.correo,
                clave:req.body.clave
            }

        Database.login(user, (err, data) => {
            if(err) return res.status(500).json({success: false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al intentar el login`});

            const friendsbooktoken = jwt.sign({id:user.correo}, process.env.SECRET_TOKEN,{expiresIn:60*60*24})//creamos el token y que expire en 1 dia
            res.status(200).json({success:true, data:data, friendsbooktoken:friendsbooktoken})
        })
    });

    //usuario por id ruta -> http://localhost:3001/api/getUserById/:id
    router.get('/getUserById/:id', (req, res) => {
        let id = req.params.id;

        Database.getUserById(id, (err, data) => {
            if(err) return res.status(500).json({success: false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    });
    
     //buscar usuarios ruta -> http://localhost:3001/api/getUserBySearch/:id/:id2
     router.get('/getUserBySearch/:id/:id2', (req, res) => {
         let nombre = req.params.id;
         let apellido = req.params.id2;

         Database.getUserBySearch(nombre, apellido, (err, data) => {
             if(err) return res.status(500).json({success: false, message:`Error al realizar la peticion:${err}`});
             if(!data) return res.status(404).json({success: false, message: `Error al devolver los datos`});

             res.status(200).json({success:true, data:data});
         })
     });
}

module.exports = endPointRouterUser;