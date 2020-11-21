const pool = require('../../config/database');

const getAllTecnicos = async () => {
    try{
        return await pool.query('Select * from tecnicos where estado_tecnico = "activo"');
    }catch(e){
        return e
    }
}


const tecnicoById = async (id) => {
    try{
        return await pool.query('Select * from tecnicos where id_tecnico = ?', [id]);
    }catch(e){
        return e
    }
}

const nuevoTecnico = async (tecnico) => {
    try{
        const {nombre_tecnico, apellido_tecnico, dni, telefono, email, clave, user} = tecnico;
        const responsable = 0;
        const estado_tecnico = 'activo';
        await pool.query('INSERT INTO tecnicos(nombre_tecnico, apellido_tecnico, responsable, DNI, clave, telefono_tecnico, email_tecnico, estado_tecnico, user_tecnico) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre_tecnico, apellido_tecnico, responsable, dni, clave, telefono, email, estado_tecnico, user]);
    }catch(e){
        return e
    }
}

const deleteById = async (id) => {
    try{
        return await pool.query('UPDATE tecnicos set estado_tecnico = "baja" where id_tecnico = ?', [id]);
    }catch(e){
        return e
    }
}


//offline
const offlineAllTecnicos = async () => {
    try{
        return await pool.query('Select * from tecnicos');
    }catch(e){
        return e;
    }
}

const nuevaClaveTecnico = async(clave, tecnico) =>{
    try{
        return await pool.query('UPDATE tecnicos set clave = ? where id_tecnico = ?');
    }catch(e){
        return e;
    }
}

module.exports = {
    getAllTecnicos,
    tecnicoById,
    nuevoTecnico,
    offlineAllTecnicos,
    deleteById,
    nuevaClaveTecnico
}
