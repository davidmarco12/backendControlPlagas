const tecnico = require('./tecnicosModels');


const getTecnicos = async (req, res) => {
    const tecnicos = await tecnico.getAllTecnicos();
    res.status(200).json({
        status : 'OK',
        result : tecnicos
    });
}

const tecnicoPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await tecnico.tecnicoById(id);
        if(!Object.keys(response).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el tecnico'
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

const crearTecnico = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await tecnico.nuevoTecnico(nuevo);
        res.status(200).json({
            status : 'OK',
            tecnicoCreado : response 
        });
    }catch(e){
        console.log(e);
    }
};


const eliminarTecnico = async (req, res) => {
    try{
        const id = req.params.id;
        const tecnicoEncontrado = await tecnico.tecnicoById(id);
        if(!Object.keys(tecnicoEncontrado).length){
            res.status(500).json({
                status : 'error',
                message : 'No se puede borrar un cliente inexistente'
            });
        }
        else{
            await tecnico.deleteById(id);
            res.status(200).json({
                status : 'OK',
                tecnicoEliminado : tecnicoEncontrado
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}



//Offline Tables
const offlineTecnicos = async (req, res) => {
    try{
        const tecnicos = await tecnico.offlineAllTecnicos();
        res.status(200).json({
            status : 'OK',
            result : tecnicos
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }   
}

module.exports = {
    getTecnicos,
    tecnicoPorId,
    crearTecnico,
    offlineTecnicos,
    eliminarTecnico
}
