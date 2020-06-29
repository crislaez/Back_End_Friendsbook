'use strict';

const Database = require('../Database/QueryComent');
const authFunction = require('../Middleware/Auth');

function endPointRouterComent(router){

    //ingresar comentario ruta -> http://localhost:3001/api/addImage
    router.post('/addComent',authFunction, (req, res) => {
        let coment = 
            {
                id_comentario:'',
                id_imagen:req.body.id_imagen,
                id_usuario:req.body.id_usuario,
                texto_comentario:req.body.texto_comentario
            }

        Database.addComent(coment, (err, data) => {
            if(err) return res.status(500).json({succesS:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al ingresar los datos`});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPointRouterComent;