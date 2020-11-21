const pool = require('../../config/database');
const QRCode = require('qrcode');
Jimp = require('jimp');

const getAllServicios = async () => {
    try{
        return await pool.query('Select * from servicios where estado_servicio = "alta"');
    }catch(e){
        return e
    }
}

const servicioById = async (id) => {
    try{
        var nombreDelServicio;
        formulario = [];
        var requiereQR;
        var listaProductos;
        var tieneProducto;
        datos = {
            nombreDelServicio,
            requiereQR,
            formulario
        }
        serviciosID = await pool.query('Select * from servicios where id_servicio = ? and estado_servicio = "alta"', [id]);
        campoID = await pool.query('Select * from campos where id_servicio = ?', [serviciosID[0].id_servicio]);
        listaProductos = await pool.query('Select * from productos where id_servicio = ?', [id]);
        tieneProductoResponse = await pool.query('Select producto from servicios where id_servicio = ?', [id]);

        tieneProducto = tieneProductoResponse[0].producto;

        
        longitudCampo = Object.keys(campoID).length;
        for(i = 0; i < longitudCampo ; i++){
            datosFormulario = {
                opciones : [],
                tipoCampo : '',
                nombreCampo : ''
            }
            opcionID = await pool.query('Select * from opciones where id_campo = ?', [campoID[i].id_campo]);
            longitudOpciones = Object.keys(opcionID).length;
            if(campoID[i].tipo_campo == 'Select' || campoID[i].tipo_campo == 'select' ){
                    for( j = 0; j < longitudOpciones; j++){
                        datosFormulario.opciones.push(opcionID[j].tipo_opcion);
                    }
            }
            else{
                datosFormulario.opciones = [];
            }
            datosFormulario.tipoCampo = campoID[i].tipo_campo;
            datosFormulario.nombreCampo = campoID[i].nombre_campo;
            formulario.push(datosFormulario);
        }

        nombreDelServicio = serviciosID[0].nombre_servicio;
        requiereQR = serviciosID[0].qr;
        datos = {
            nombreDelServicio,
            requiereQR,
            formulario,
            tieneProducto,
            listaProductos
        }
        return datos;
    }catch(e){
        console.log(e)
    }
}


const nuevoServicio = async (servicio) => {
    try{
        const {nombreDelServicio, requiereQR, formulario, producto} = servicio;
        nombreServicio = servicio.nombreDelServicio;
        qr = servicio.requiereQR;
        estado_servicio = "alta";
        const resultServicio = await pool.query('INSERT INTO servicios(nombre_servicio,qr, producto,estado_servicio) VALUES(?,?, ?,?)',[nombreServicio,qr, producto,estado_servicio]);
        idServicio = resultServicio.insertId;
        longFormulario = servicio.formulario.length;
        for(i = 0; i < longFormulario; i++){
            const resultCampo = await pool.query('INSERT INTO campos(id_servicio, tipo_campo, nombre_campo) VALUES(?,?,?)',[idServicio, servicio.formulario[i].tipoCampo, servicio.formulario[i].nombreCampo]);
            idCampo = resultCampo.insertId;
            longOP = servicio.formulario[i].opciones.length;
            for(j = 0; j < longOP; j++){
                const response = await pool.query('INSERT INTO opciones(id_campo,tipo_opcion) VALUES(?,?)',[idCampo, formulario[i].opciones[j].opcion]);
                console.log(formulario[i].opciones[j].opcion);
            }
        }
        return response;
    }catch(e){
        return e;
    }
}


const deleteById = async (id) => {
    try{
        await pool.query('UPDATE servicios set estado_servicio = "baja" where id_servicio = ?', [id]);
        await pool.query('UPDATE servicios_adquiridos set estado_servicio_adquiridos = "baja" where id_servicio = ?', [id]);
        return 'Servicio Eliminado'
    }catch(e){
        return e
    }
}

const deleteEquiposById = async (id) => {
    try{
        return await pool.query('DELETE FROM equipos where id_equipo = ?', [id]);
    }catch(e){
        return e
    }
}


const generateQR = async text => {
    try {
        const a = await QRCode.toDataURL(text, {
            width : 3,
            scale: 10
        });
        return a;
    }catch (err) {
      return(err)
    }
}





//Crear equipos
const nuevoEquipo = async (equipos) => {
    try{
        const {id_servicio, id_sucursal, nombre_equipos} = equipos;
        const resEquipos = await pool.query('INSERT INTO equipos(id_servicio, id_sucursal, nombre_equipo) VALUES(?,?,?)',[id_servicio, id_sucursal, nombre_equipos]);
        const url = await generateQR(resEquipos.insertId.toString());
        var buf = Buffer.from(url.replace(/^data:image\/png;base64,/, ""), 'base64');
        Jimp.read(buf)
        .then(img => {
            Jimp.loadFont(Jimp.FONT_SANS_14_BLACK).then(function(font){
                img.print(font, 0, 0, {text : nombre_equipos,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM},
                    270,
                    285 );
                img.greyscale().getBase64(Jimp.AUTO, (err, res) => {
                    pool.query('UPDATE equipos set codigo_qr_equipo = ? where id_equipo = ?',[res,resEquipos.insertId]);
                });
            });
        }).catch(function(err) {
        	console.error(err);
        });
        await  console.log(resEquipos)
        return resEquipos;
    }catch(e){
        return e;
    }
}


const getEquiposByIdSucursal = async (id) => {
    try{
        return await pool.query('Select * from equipos INNER JOIN servicios on equipos.id_servicio = servicios.id_servicio  where id_sucursal = ?',[id]);
    }catch(e){
        return e
    }
}

//offline
const offlineAllServicios = async () => {
    try{
        return await pool.query('Select * from servicios');
    }catch(e){
        return e;
    }
}

const offlineAllServiciosAdquiridos = async () => {
    try{
        return await pool.query('Select * from servicios_adquiridos');
    }catch(e){
        return e;
    }
}

const offlineAllCampos = async () => {
    try{
        return await pool.query('Select * from campos');
    }catch(e){
        return e;
    }
}

const offlineAllOpciones = async () => {
    try{
        return await pool.query('Select * from opciones');
    }catch(e){
        return e;
    }
}

const offlineAllEquipos = async () => {
    try{
        return await pool.query('Select * from equipos');
    }catch(e){
        return e;
    }
}

const offlineSectores = async () => {
    try{
        return await pool.query('Select * from sectores');
    }catch(e){
        return e;
    }
}

const nuevoSector = async (sector) => {
    try{
        const {id_tecnico, id_equipo} = sector;
        var firma_tecnico = "NULL";
        return await pool.query('Insert into sectores(id_tecnico, id_equipo, firma_tecnico) VALUES(?,?,?)', [id_tecnico, id_equipo, firma_tecnico]);
    }catch(e){
        return e;
    }
}


module.exports = {
    getAllServicios,
    servicioById,
    nuevoServicio,
    offlineAllServicios,
    offlineAllServiciosAdquiridos,
    offlineAllCampos,
    offlineAllOpciones,
    offlineAllEquipos,
    offlineSectores,
    nuevoEquipo,
    getEquiposByIdSucursal,
    deleteById,
    deleteEquiposById,
    nuevoSector
}
