const pool = require('../../config/database');

const getAllVisitas = async () => {
    try{
        const nombreServicios = [];
        const visitas = await pool.query('SELECT visitas.id_visita, horario_salida, horario_entrada, visitas.fecha_visita, razon_social_sucursal, direccion_sucursal, email_sucursal, telefono_sucursal, razon_social_cliente, direccion, telefono, email, estado_visitas FROM visitas INNER JOIN sucursales ON visitas.id_sucursal = sucursales.id_sucursal INNER JOIN clientes ON visitas.id_cliente = clientes.id_cliente');
        longVisitas = visitas.length
        for(i = 0; i < longVisitas; i++){
            const serviciosAdq = await pool.query('Select nombre_servicio, servicios.id_servicio from servicios_adquiridos INNER JOIN servicios ON servicios_adquiridos.id_servicio = servicios.id_servicio where id_visita = ? and estado_servicio = "alta"',[visitas[i].id_visita]);
            visitas[i]["servicios"] = serviciosAdq;
        }
        return visitas;
    }catch(e){
        console.log(e);
        return e;
    }
}

const visitasById = async (id) => {
    try{
        const visita = await pool.query('Select  id_visita, horario_entrada, horario_salida, fecha_visita, razon_social_sucursal, email, direccion_sucursal, razon_social_cliente from visitas  INNER JOIN sucursales ON visitas.id_sucursal = sucursales.id_sucursal INNER JOIN clientes ON visitas.id_cliente = clientes.id_cliente where visitas.id_visita = ?', [id]);
        const tecnicos = await pool.query('Select nombre_tecnico, apellido_tecnico from tecnicos INNER JOIN sectores ON sectores.id_tecnico = tecnicos.id_tecnico INNER JOIN servicios_adquiridos ON servicios_adquiridos.id_sector = sectores.id_sector where servicios_adquiridos.id_visita = ?', [visita[0].id_visita])
        const servicios = await pool.query('Select nombre_servicio,servicios.id_servicio from servicios_adquiridos INNER JOIN servicios ON servicios_adquiridos.id_servicio = servicios.id_servicio where id_visita = ? and estado_servicio = "alta"', [visita[0].id_visita]);
        const visitas = visita[0];
        return({
            visitas,
            tecnicos,
            servicios
        });
    }catch(e){
        return e
    }
}

const nuevaVisita = async (visita) => {
    try{
        const {id_cliente,id_sucursal,servicios,fecha_visita} = visita;
        //servicios = [{id_servicio, id_tecnico, id_equipo}, {id_servicio, id_tecnico, id_equipo}, {id_servicio, id_tecnico, id_equipo}]
        estado_visita = 'pendiente';
        firma_cliente = 'NULL';
        firma_tecnico = 'NULL';
        horario_entrada = 'NULL';
        horario_salida = 'NULL';
        tipoVisita = 'normal';
        observaciones = 'NULL';
        estado_servicio_adquiridos = "alta";
        longServicios = visita.servicios.length;
        const response = await pool.query('INSERT INTO visitas(id_sucursal, id_cliente, fecha_visita, estado_visitas,firma_cliente, horario_entrada, horario_salida, observaciones, tipo_visita) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_sucursal, id_cliente, fecha_visita, estado_visita, firma_cliente, horario_entrada, horario_salida, observaciones, tipoVisita]);
        for(i = 0; i < longServicios; i++){
            let sector = await pool.query('Insert into sectores(id_tecnico, id_equipo, firma_tecnico) VALUES(?,?,?)', [visita.servicios[i].id_tecnico,visita.servicios[i].id_equipo, firma_tecnico])
            await pool.query('INSERT INTO servicios_adquiridos(id_servicio, id_visita, estado_servicio_adquiridos, id_sector) VALUES(?,?,?,?)',[visita.servicios[i].id_servicio, response.insertId, estado_servicio_adquiridos, sector.insertId]);
        }
        return "visita creada";
    }catch(e){
        console.log(e);
        return e
    }
}




const actualizarVisitas = async (visita) => {
    try{
        const {datos_completos} = visita;
        const estado_servicio_adquiridos = "alta";
        const visita_estado = "finalizada";
        let estadoActualVisita = '';
            for(i = 0; i < datos_completos.length; i++){
                const cantidadTecnicos = await pool.query('Select COUNT(*) from visitas INNER JOIN servicios_adquiridos on servicios_adquiridos.id_visita = visitas.id_visita INNER JOIN sectores on servicios_adquiridos.id_sector = sectores.id_sector INNER JOIN tecnicos on tecnicos.id_tecnico = sectores.id_tecnico where servicios_adquiridos.id_visita = ? ',[datos_completos[i].id_visita])
                if(datos_completos[i].tipo_visita == 'normal'){
                    
                    const verificarVisita = await pool.query('Select * from visitas where id_visita = ?',[datos_completos[i].id_visita]);
                    if(verificarVisita[0].estado_visitas == 'en proceso'){
                        estadoActualVisita = "finalizada"; 
                    }else{
                        estadoActualVisita = "finalizada";
                        if(cantidadTecnicos[0]['COUNT(*)'] > 1) estadoActualVisita = "en proceso";
                    }
                    
                    await pool.query('UPDATE sectores set firma_tecnico = ? where id_tecnico = ?',[datos_completos[i].firma_tecnico ,datos_completos[i].id_tecnico]);
			console.log(datos_completos[i].id_tecnico)
			console.log(datos_completos[i].firma_tecnico)
			
                    await pool.query('UPDATE visitas set  estado_visitas = ?, firma_cliente = ? , horario_entrada = ?, horario_salida = ?, observaciones = ? where id_visita = ?', [ estadoActualVisita, datos_completos[i].firma_cliente,  datos_completos[i].horario_entrada, datos_completos[i].horario_salida, datos_completos[i].observaciones, datos_completos[i].id_visita ]);
                    
                    for(j = 0; j < datos_completos[i].listaFormulario.length; j++){ 
                        const response = await pool.query('INSERT INTO formularios(id_visita, id_servicio) VALUES(?,?)',[datos_completos[i].id_visita, datos_completos[i].listaFormulario[j].id_servicio]);
                        for(k = 0; k < datos_completos[i].listaFormulario[j].listaRespuestas.length;k++){
                            await pool.query('INSERT INTO respuestas(id_campo, respuesta,id_formulario, id_equipo) VALUES(?,?,?,?)', [datos_completos[i].listaFormulario[j].listaRespuestas[k].id_campo,datos_completos[i].listaFormulario[j].listaRespuestas[k].respuesta, response.insertId, datos_completos[i].listaFormulario[j].listaRespuestas[k].id_equipo ]);
                        }
                    }
                }
                else{
                    const response2 = await pool.query('Insert into visitas(id_tecnico, id_sucursal, id_cliente, fecha_visita, estado_visitas, firma_cliente, firma_tecnico,horario_entrada, horario_salida, observaciones, tipo_visita) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [datos_completos[i].id_tecnico, datos_completos[i].id_sucursal, datos_completos[i].id_cliente,datos_completos[i].fecha_visita, visita_estado, datos_completos[i].firma_cliente, datos_completos[i].firma_tecnico,datos_completos[i].horario_entrada, datos_completos[i].horario_salida, datos_completos[i].observaciones, datos_completos[i].tipo_visita]);
                    for(j = 0; j < datos_completos[i].listaFormulario.length; j++){
                        
                        const sectorEmergencia = await pool.query('Insert into sectores(id_equipo, id_tecnico, firma_tecnico)', [datos_completos[i].listaFormulario[j].id_equipo, datos_completos[i].id_tecnico, datos_completos[i].firma_tecnico]);

                        await pool.query('INSERT INTO servicios_adquiridos(id_visita, id_servicio, estado_servicio_adquiridos, id_sector) VALUES(?,?, ?, ?)',[response2.insertId, datos_completos[i].listaFormulario[j].id_servicio, estado_servicio_adquiridos, sectorEmergencia.insertId]);
                        
                        const response = await pool.query('INSERT INTO formularios(id_visita, id_servicio) VALUES(?,?)',[response2.insertId, datos_completos[i].listaFormulario[j].id_servicio]);
                        
                        for(k = 0; k < datos_completos[i].listaFormulario[j].listaRespuestas.length; k++){
                            await pool.query('INSERT INTO respuestas(id_campo, respuesta, id_formulario, id_equipo) VALUES(?,?,?,?)', [datos_completos[i].listaFormulario[j].listaRespuestas[k].id_campo, datos_completos[i].listaFormulario[j].listaRespuestas[k].respuesta, response.insertId, datos_completos[i].listaFormulario[j].listaRespuestas[k].id_equipo ]);
                        }
                    }

                }
                
            }
        return 'visita realizada';
    }catch(e){
        console.log(e);
        return(e);
    }
}










const updateVisitas = async (visitas) => {
    try{
        const {id_visita, fecha_visita, id_tecnico, servicios} = visitas;
        await pool.query('UPDATE visitas set fecha_visita = ?, id_tecnico = ? where id_visita = ?',[fecha_visita, id_tecnico, id_visita]);
        await pool.query('DELETE FROM servicios_adquiridos where id_visita = ?', [id_visita]);

        console.log(servicios);
        const longServicios = servicios.length;
        const estado_servicio_adquiridos = "alta";
        for(i = 0; i < longServicios; i++){
            console.log(servicios[i]);
            await pool.query('INSERT INTO servicios_adquiridos(id_servicio, id_visita, estado_servicio_adquiridos ) VALUES(?,?, ?)',[servicios[i], id_visita, estado_servicio_adquiridos]);
        }

        return 'visita actualizada con exito';
    }catch(e){
        return e;
    }
}







//offline
const offlineAllVisitas = async (req,res) => {
    try{
        return await pool.query('Select * from visitas');
    }catch(e){
        return e;
    }
}

const deleteById = async (id) => {
    try{
        await pool.query('DELETE FROM visitas where id_visita = ?', [id]);
        await pool.query('DELETE FROM servicios_adquiridos where id_visita = ?', [id]);
        return 'visita eliminada';
    }catch(e){
        return e
    }
}


module.exports = {
    getAllVisitas,
    visitasById,
    nuevaVisita,
    offlineAllVisitas,
    actualizarVisitas,
    deleteById,
    updateVisitas
}
