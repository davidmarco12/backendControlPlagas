const pool = require('../../config/database');

const getAllPlanos = async () => {
    try{
        return await pool.query('Select * from planos');
    }catch(e){
        return e
    }
}

const planoById = async (id) => {
    try{
        return await pool.query('Select * from planos where id_plano = ?', [id]);
    }catch(e){
        return e
    }
}

const nuevoPlano = async (plano) => {
    try{
        const {id_sucursal, imagen} = plano
        return await pool.query('INSERT INTO planos(id_sucursal, url_imagen_plano) VALUES (?,?)', [id_sucursal, imagen]);
    }catch(e){
        return e
    }
}

const deleteById = async (id) => {
    try{
        return await pool.query('DELETE FROM planos where id_plano = ?', [id]);
    }catch(e){
        return e
    }
}

const offlineAllPlanos = async (req,res) => {
    try{
        return await pool.query('Select * from planos');
    }catch(e){
        return e;
    }
}

module.exports = {
    getAllPlanos,
    planoById,
    nuevoPlano,
    offlineAllPlanos,
    deleteById
}