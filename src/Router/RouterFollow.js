'use Strict';

const Database = require('../Database/QueryFollow');
const authFunction = require('../Middleware/Auth');

function endPointRouterFollow(router){

    //agregar seguidor ruta -> http://localhost:3001/api/adFollow
    router.post('/adFollow',authFunction, (req, res) => {
        let follow = 
            {
               id_seguir:'',
               id_usuario_seguido:req.body.id_usuario_seguido,
               id_usuario_seguidor:req.body.id_usuario_seguidor
            }

        Database.adFollow(follow, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({success:false, message:`Error al ingresar el seguimiento`});

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointRouterFollow;