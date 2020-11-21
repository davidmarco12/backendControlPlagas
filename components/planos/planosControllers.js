const plano = require('./planosModels');
const multer = require('multer');
const path = require('path');

const getPlanos = async (req, res) => {
    const planos = await plano.getAllPlanos();
    res.status(200).json({
        status : 'OK',
        result : planos
    });
}


const planoPorId = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await plano.planoById(id);
        if(!Object.keys(response).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el plano'
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


const crearPlano = async (req, res) => {
    try{
        const planos = req.body;
        const response = await plano.nuevoPlano(planos);
        res.status(200).json({
            status : 'OK',
            planoCreado : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};

const offlinePlanos = async (req, res) => {
    try{
        const planos = await plano.offlineAllPlanos();
        res.status(200).json({
            status : 'OK',
            result : planos
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const deletePlanoById = async (req, res) => {
    try{
        const id = req.params.id;
        const planoEliminado = await plano.deleteById(id);
        res.status(200).json({
            status : 'OK',
            planoEliminado : planoEliminado
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


module.exports = {
    getPlanos,
    planoPorId,
    crearPlano,
    offlinePlanos,
    deletePlanoById
}