'use strcit';

require('dotenv').config();

const express = require('express');

const endPointRouterUser = require('./Router/RouterUser');
const endPointRouterImage = require('./Router/RouterImage');
const endPointRouterComent = require('./Router/RouterComent');
const endPointRouterFollow = require('./Router/RouterFollow');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//carpeta para subir los archivos
app.use('/Img', express.static(__dirname + '/Img', {maxAge:'12h'}));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const router = express.Router();
app.use('/api',router);

//endpoints para los datos de los usuarios
endPointRouterUser(router);
endPointRouterImage(router);
endPointRouterComent(router);
endPointRouterFollow(router);

app.listen(process.env.PORT,() => {console.log(`Api Rest corriendo en:${process.env.RUTA}`)})
