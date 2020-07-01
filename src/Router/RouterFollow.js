'use Strict';

const Database = require('../Database/QueryFollow');
const authFunction = require('../Middleware/Auth');

function endPointRouterFollow(router){

    //agregar seguidor ruta -> http://localhost:3001/api/addFollow
    router.post('/addFollow',authFunction, (req, res) => {
        let follow = 
            {
               id_seguir:'',
               id_usuario_seguido:req.body.id_usuario_seguido,
               id_usuario_seguidor:req.body.id_usuario_seguidor
            }

        Database.addFollow(follow, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al ingresar el seguimiento`});

            res.status(200).json({success:true, data:data});
        })
    });

    //agregar seguidor ruta -> http://localhost:3001/api/chechkFollow/:id/:id2
    router.get('/chechkFollow/:id/:id2', (req, res) => {
        let id = req.params.id;
        let id2 = req.params.id2;

        Database.chechkFollow(id, id2, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver el seguimiento`});

            res.status(200).json({success:true, data:data});
        })
    });

    //dejar de seguir ruta -> http://localhost:3001/api/chechkFollow/:id/:id2
    router.delete('/unFollow/:id/:id2',authFunction, (req, res) => {
        let id = req.params.id;
        let id2 = req.params.id2;

        Database.unFollow(id, id2, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al devolver el seguimiento`});

            res.status(200).json({success:true, data:data});
        })
    })
}

module.exports = endPointRouterFollow;