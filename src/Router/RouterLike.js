'use strict';

const Database = require('../Database/QueryLike');
const authFunction = require('../Middleware/Auth');

function endPoinRouterLike(router){

    //agregar like ruta -> http://localhost:3001/api/addLike
    router.post('/addLike',authFunction, (req, res) => {
        let like = 
            {
                id_megusta:'',
                id_imagenes:req.body.id_imagenes,
                id_usuario:req.body.id_usuario
            }

        Database.addLike(like, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(4004).json({success:false, message:`Error al intentar dar like`});
            
            res.status(200).json({success:true, data:data});
        })
    });

    //agregar like ruta -> http://localhost:3001/api/checkLike/:id/:id2
    router.get('/checkLike/:id/:id2', (req, res) => {
        let like = 
            {
                id_imagenes:req.params.id,
                id_usuario:req.params.id2
            }
    
        Database.checkLike(like, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(4004).json({success:false, message:`Error al devolver los likes`});
            
            res.status(200).json({success:true, data:data})
        })
    });

    //remover like ruta -> http://localhost:3001/api/removeLike/:id/:id2
    router.delete('/removeLike/:id/:id2',authFunction,(req, res) => {
        let like = 
            {
                id_imagenes:req.params.id,
                id_usuario:req.params.id2
            }

        Database.removeLike(like, (err,data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion`});
            if(!data) return res.status(404).json({success:false, message:`Error al remover el like`});

            res.status(200).json({success:true, data:data});
        })
    })

}

module.exports = endPoinRouterLike;