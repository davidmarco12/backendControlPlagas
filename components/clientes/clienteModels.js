const pool = require('../../config/database');

const getAllClientes = async () => {
    try{
        return await pool.query('Select * from clientes');
    }catch(e){
        return e
    }
}

const clienteById = async (id) => {
    try{
        planos = [];
        clienteID = await pool.query('Select * from clientes where id_cliente = ?', [id]);
        sucursalID = await pool.query('Select * from sucursales where id_cliente = ?', [clienteID[0].id_cliente]);
        visitas = await pool.query('Select id_visita, razon_social_sucursal, fecha_visita, estado_visitas from visitas INNER JOIN sucursales ON visitas.id_sucursal = sucursales.id_sucursal where visitas.id_cliente = ?',[clienteID[0].id_cliente])
        longitud = Object.keys(sucursalID).length
        for(i = 0; i < longitud ; i++){
            planosID = await pool.query('Select * from planos where id_sucursal = ?', [sucursalID[i].id_sucursal]);
            planos.push(planosID);
        }
        const datos = {
            clienteDatos : clienteID,
            sucursales : {
                datosSucursal : sucursalID,
                planos,
                visitas
            }
        }
        return datos;
    }catch(e){
        return e
    }
}

const nuevoCliente = async (cliente) => {
    try{
        const {razon_social_cliente, direccion, telefono, email} = cliente
        const logo_cliente = "NULL"; 
        await pool.query('INSERT INTO clientes(razon_social_cliente, direccion, telefono, email, logo_cliente) VALUES (?,?, ?, ?, ?)', [razon_social_cliente, direccion, telefono, email, logo_cliente]);
    }catch(e){
        return e
    }
}

const updateCliente = async(cliente) => {
    try{
        const {id_cliente, razon_social_cliente, direccion, telefono , email} = cliente
        await pool.query('UPDATE clientes set razon_social_cliente = ?, direccion = ?, telefono = ?, email = ? where id_cliente = ?', [razon_social_cliente, direccion, telefono , email, id_cliente]);

        return 'cliente actualizado';
    }catch(e){
        return e
    }
}

const updateLogoCliente = async(cliente) => {
    try{
        const {id_cliente, logo} = cliente;
        await pool.query('UPDATE clientes set logo_cliente = ? where id_cliente = ?',[logo,id_cliente]);

        return 'logo actualizado';
    }catch(e){
        return e;
    }
}

const deleteLogoCliente = async(id) => {
    try{
        await pool.query('UPDATE clientes set logo_cliente = "NULL" where id_cliente = ?',[id_cliente]);

        return 'logo eliminado';
    }catch(e){
        return e;
    }
}

const deleteById = async (id) => {
    try{
        return await pool.query('DELETE FROM clientes where id_cliente = ?', [id]);
    }catch(e){
        return e
    }
}

//offline
const offlineAllClientes = async (req,res) => {
    try{
        return await pool.query('Select * from clientes');
    }catch(e){
        return e;
    }
}


module.exports = {
    getAllClientes,
    clienteById,
    nuevoCliente,
    deleteById,
    offlineAllClientes,
    updateCliente,
    updateLogoCliente,
    deleteLogoCliente
}