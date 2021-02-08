import express from "express";
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';

dotenv.config({path: "variables.env"}); 

const app = express();

//Conectar la DB
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))



//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

//Agregar Body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'))

//Agregar router
app.use('/', router);

//definir puerto y host
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el pueto ${port} y con el host ${host}`)
});