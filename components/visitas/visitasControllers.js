const visita = require('./visitasModels');


const getVisitas = async (req, res) => {
    const visitas = await visita.getAllVisitas();
    res.status(200).json({
        status : 'OK',
        result : visitas
    });
}

const visitaPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await visita.visitasById(id);
        if(!Object.keys(response).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra la visita'
            });
        }
        else{
            res.status(200).json({
                status : 'OK',
                result : response
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const crearVisita = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await visita.nuevaVisita(nuevo);
        res.status(200).json({
            status : 'OK',
            visitaCreada : response 
        });
    }catch(e){
        console.log(e);
    }
};

const actualizarVisita = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await visita.actualizarVisitas(nuevo);
        res.status(200).json({
            status : 'OK',
            datosActualizados : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'OK',
            message : e 
        });
    }
};


const actualizarVisitaNueva = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await visita.updateVisitas(nuevo);
        res.status(200).json({
            status : 'OK',
            datosActualizados : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'OK',
            message : e 
        });
    }
};


//Offline Tables
const offlineVisitas = async (req, res) => {
    try{
        const visitasOff = await visita.offlineAllVisitas();
        res.status(200).json({
            status : 'OK',
            result : visitasOff
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


const deleteVisitaById = async (req, res) => {
    try{
        const id = req.params.id;
        const visitaEliminada = await visita.deleteById(id);
        res.status(200).json({
            status : 'OK',
            visitaEliminada : visitaEliminada
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


module.exports = {
    getVisitas,
    visitaPorId,
    crearVisita,
    offlineVisitas,
    actualizarVisita,
    deleteVisitaById,
    actualizarVisitaNueva
}