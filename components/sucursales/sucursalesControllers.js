const sucursal = require('./sucursalesModels');



const getSucursales = async (req, res) => {
    const sucursales = await sucursal.getAllSucursales();
    res.status(200).json({
        status : 'OK',
        result : sucursales
    });
}


const sucursalPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const sucursalID = await sucursal.sucursalById(id);
        if(!Object.keys(sucursalID).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra la sucursal'
            });
        }
        else{
            res.status(200).json({
                status : 'OK',
                result : sucursalID
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


const crearSucursal = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await sucursal.nuevaSucursal(nuevo);
        res.status(200).json({
            status : 'OK',
            sucursalCreada : response 
        });
    }catch(e){
        console.log(e);
    }
};

const offlineSucursales = async (req, res) => {
    try{
        const sucursales = await sucursal.offlineAllSucursales();
        res.status(200).json({
            status : 'OK',
            result : sucursales
        });  
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const deleteSucursalById = async (req, res) => {
    try{
        const id = req.params.id;
        const respuesta = await sucursal.deleteById(id);
        res.status(200).json({
            status : 'OK',
            sucursalEliminada : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


const actualizarSucursal = async (req, res) => {
    try{
        const sucursales = req.body;
        const respuesta = await sucursal.updateSucursal(sucursales);
        res.status(200).json({
            status : 'OK',
            sucursalActualizada : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

module.exports = {
    getSucursales,
    sucursalPorId,
    crearSucursal,
    offlineSucursales,
    deleteSucursalById,
    actualizarSucursal
}
