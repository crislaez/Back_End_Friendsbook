'use strict';

const Database = require('../Database/QueryChat');
const authFunction = require('../Middleware/Auth');

function endPointRouterChat(router){

    //ingresar chat ruta -> http://localhost:3001/api/addChat
    router.post('/addChat',authFunction,(req, res) => {
        let chat = 
            {
                id_chat:'',
                id_usuario_uno:req.body.id_usuario_uno,
                id_usuario_dos:req.body.id_usuario_dos,
                mensaje:req.body.mensaje
            }

        Database.addChat(chat, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) res.status(404).json({success:false, message:`Error al ingrensar el mensaje`});

            res.status(200).json({success:true, data:data});
        })
    });

    //mostrar chat 2 usuarios ruta -> http://localhost:3001/api/getChatByIdUSers/:id/:id2
    router.get('/getChatByIdUSers/:id/:id2', (req, res) => {
        let idUno = req.params.id;
        let idDos = req.params.id2;

        Database.getChatByIdUSers(idUno, idDos, (err, data) => {
            if(err) return res.status(500).json({success:false, message:`Error al realizar la peticion:${err}`});
            if(!data) res.status(404).json({success:false, message:`Error al devolver los mensajes`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endPointRouterChat;