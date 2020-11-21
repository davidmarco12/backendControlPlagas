const cliente = require('./clienteModels');
const plano = require('../planos/planosModels');
const sucursal = require('../sucursales/sucursalesModels');

const getClientes = async (req, res) => {
    const clientes = await cliente.getAllClientes();
    res.status(200).json({
        status : 'OK',
        result : clientes
    });
}



const clientePorId = async (req, res) => {
    try{
        const id = req.params.id;
        const clienteID = await cliente.clienteById(id);
        if(!Object.keys(clienteID).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el cliente'
            });
        }
        else{
            res.status(200).json({
                status : 'OK',
                result : clienteID
            });
        }
        
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
        
    } 
}

const crearCliente = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await cliente.nuevoCliente(nuevo);
        res.status(200).json({
            status : 'OK',
            clienteCreado : response 
        });
    }catch(e){
        console.log(e);
    }
};


const eliminarCliente = async (req, res) => {
    try{
        const id = req.params.id;
        const clienteEncontrado = await cliente.clienteById(id);
        if(!Object.keys(clienteEncontrado).length){
            res.status(500).json({
                status : 'error',
                message : 'No se puede borrar un cliente inexistente'
            });
        }
        else{
            await cliente.deleteById(id);
            res.status(200).json({
                status : 'OK',
                clienteElinado : clienteEncontrado
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const actualizarCliente = async (req, res) => {
    try{
        const clientes = req.body;
        const respuesta = await cliente.updateCliente(clientes);
        res.status(200).json({
            status : 'OK',
            clienteActualizado : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const actualizarLogoCliente = async (req, res) => {
    try{
        const clientes = req.body;
        const respuesta = await cliente.updateLogoCliente(clientes);
        res.status(200).json({
            status : 'OK',
            clienteLogoActualizado : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const eliminarLogoCliente = async (req, res) => {
    try{
        const id = req.params.id;
        const respuesta = await cliente.deleteLogoCliente(id);
        res.status(200).json({
            status : 'OK',
            clienteLogoEliminado : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}




//Offline Tables
const offlineClientes = async (req, res) => {
    try{
        const clientes = await cliente.offlineAllClientes();
        res.status(200).json({
            status : 'OK',
            result : clientes
        });
        
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}



module.exports = {
    getClientes,
    clientePorId,
    crearCliente,
    eliminarCliente,
    offlineClientes,
    actualizarCliente,
    actualizarLogoCliente,
    eliminarLogoCliente
}

