
var dboperations = require('./dboperations');
var Client = require ('./clients');

var express  = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
///crear instancias para el uso de bodyparser, cors, y routers
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

///ruta base de la api sera /api
app.use('/api/',router)

//puerto donde correrá la api 
var port = process.env.PORT || 8090;
app.listen(port);
console.log('API running at port '+ port);
 
///catalogo de rutas de la api


//obtener todos los clientes
router.route("/clients").get((request, response, next)=>{
    dboperations.getClients().then(result=>{
       response.json(result[0])
    })
})

//obtener un cliente por su id
router.route("/clients/:id").get((request, response, next)=>{
    dboperations.getSingleClient(request.params.id).then(result=>{
       response.json(result[0])
    })
})

//editar los detalles de un clientes

router.route("/clients/:id").put((request, response, next)=>{
    let client = {...request.body}
    dboperations.editClient(request.params.id,client).then(result=>{
       response.status(200).json({success:true});
    })
})

//eliminar un cliente

router.route("/clients/:id").delete((request, response, next)=>{
    dboperations.deleteClient(request.params.id).then(result=>{
       response.status(200).json({success:true});
    })
})

//crear un cliente

router.route("/clients").post((request, response, next)=>{
    let client = {...request.body}
    dboperations.createClient(client).then(result=>{
       response.status(200).json({success:true});
    })
})