'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken');
const authFunction = require('../Middleware/Auth');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../Img'})/// ./img es pa carpeta donde se subira la foto

const Database = require('../Database/QueryImage');

function endPointRouterImage(router){

    //ingresar imagen ruta -> http://localhost:3001/api/addImage
    router.post('/addImage',authFunction,multipartMiddleware, (req, res) => {
        let aux = req.files.imagen.path.split('\\');
        let num = aux.length;

        let image = 
            {
                id_imagenes:'',
                id_usuario:req.body.id_usuario,
                imagen:process.env.RUTA+'/Img/'+aux[num-1],
                titulo_imagen:req.body.titulo_imagen,
                fecha_imagen:req.body.fecha_imagen
            }

        Database.addImage(image, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })        
    });

    //mostrar todas las imagenes por usuario ruta -> http://localhost:3001/api/getImageByIdUser/:id
    router.get('/getImageByIdUser/:id', (req, res) => {
        let id = req.params.id;

        Database.getImageByIdUser(id, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //mostrar una imagen ruta -> http://localhost:3001/api/getImageByIdImage/:id
    router.get('/getImageByIdImage/:id', (req, res) => {
        let id = req.params.id;

        Database.getImageByIdImage(id, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    });

    //borrar una imagen ruta -> http://localhost:3001/api/deteleImageByIdImage/:id
    router.delete('/deteleImageByIdImage/:id',authFunction,(req, res) => {
        let id = req.params.id;

        Database.deteleImageByIdImage(id, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //mostrar todas las imagenes ruta -> http://localhost:3001/api/getAllImage
    router.get('/getAllImage', (req, res) => {
        Database.getAllImage((err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver los datos`});

            res.status(200).json({success:true, data:data})
        })
    })


}

module.exports = endPointRouterImage;