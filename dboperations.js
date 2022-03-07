var config = require ('./dbconfig');
const sql = require('mssql/msnodesqlv8')

//funcion para obtener todos los clientes 
async function getClients(){
    try{
        let pool = await sql.connect(config);
        let clients = await pool.request().query("exec ShowAllClients");
        return clients.recordsets;
    }
    catch(err){
        console.log(err);
    }
}
///funcion para obtener un solo cliente
async function getSingleClient(id){
    try{
        let pool = await sql.connect(config);
        let clients = await pool.request()
        .input('input_parameter',sql.Int,id)
        .query("exec ShowSingleClient @id=@input_parameter");
        return clients.recordsets;
    }
    catch(err){
        console.log(err);
    }
}
 //editar detalles de cliente
async function editClient(id, data){
    try{
        let pool = await sql.connect(config);
        let clients = await pool.request()
        .query(`EXEC UpdateClient @name=${data.nombre},@firstname=${data.apellidoPaterno},@lastname=${data.apellidoMaterno}, @rfc=${data.rfc},@curp=${data.curp},@id=${id}`);
        return clients.recordsets;
    }
    catch(err){
        console.log(err);
    }

}


//eliminar cliente
async function deleteClient(id){
    try{
        let pool = await sql.connect(config);
        let clients = await pool.request()
        .input('input_parameter',sql.Int,id)
        .query("exec DeleteClient @id=@input_parameter");
        return clients.recordsets;
    }
    catch(err){
        console.log(err);
    }

}
//crear cliente
async function createClient(data){
    let id= Math.floor(Math.random() * 100);
    let nombre = data.nombre
    let paterno= data.apellidoPaterno
    let materno = data.apellidoMaterno
    let rfc= data.rfc
    let curp= data.curp
    try{
        let pool = await sql.connect(config);
        let clients = await pool.request()
        .query(`EXEC InsertClient @id=${id},@name=${nombre},@firstname=${paterno},@lastname=${materno}, @rfc=${rfc},@curp=${curp}`);
        return clients.recordsets;
    }
    catch(err){
        console.log(err);
    }


}
module.exports ={
    getClients: getClients,
    getSingleClient: getSingleClient,
    editClient: editClient,
    deleteClient: deleteClient,
    createClient: createClient
}