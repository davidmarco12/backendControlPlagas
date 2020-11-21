const pool = require('../../config/database');

const nuevoFormulario = async (formulario) => {
    try{
        const {id_visita, id_servicio} = formulario
        return await pool.query('INSERT INTO formularios(id_visita, id_servicio) VALUES(?,?) ', [id_visita, id_servicio]);
    }catch(e){
        return e;
    }
}

const nuevasRespuestas = async(respuestas) =>{
    try{
        const {id_campo, respuesta, id_formulario, id_equipo} = respuestas;
        return await pool.query('INSERT INTO respuestas(id_campo, respuesta, id_formulario, id_equipo) VALUES(?,?, ?, ?) ', [id_campo, respuesta, id_formulario, id_equipo]);
    }catch(e){
        return e;
    }
}

module.exports = {
    nuevoFormulario,
    nuevasRespuestas
}