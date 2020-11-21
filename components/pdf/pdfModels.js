const pool = require('../../config/database');


const crearObjetoPdf = async (id) =>{
    try{
        var nombreCliente;
        var nombreTecnico;
        var fechaVisita;
	  	var fechaEntrada;
      	var fechaSalida;
		var firmaCliente;
        var firmaTecnico;
        var apellido_tecnico;
        var servicios = [];
        var formulario = [];

        const listaServicios = await pool.query('Select nombre_servicio from servicios where estado_servicio ="alta"', []);
        const listaVisita = await pool.query('Select logo_cliente,direccion_sucursal,observaciones, razon_social_cliente,fecha_visita, horario_entrada, horario_salida, firma_cliente from visitas INNER JOIN clientes on clientes.id_cliente = visitas.id_cliente INNER JOIN sucursales ON visitas.id_cliente = sucursales.id_cliente where id_visita = ?', [id]);
        
        /*producto = [{
            nombre servicio : asda,
            datosProducto : [{
                id_prod
                idserv
                nombre,
                fechavenc
                datos
            }]
        }]
        */

        const datosServicios = await pool.query('Select * from servicios INNER JOIN servicios_adquiridos ON servicios_adquiridos.id_servicio = servicios.id_servicio INNER JOIN visitas on servicios_adquiridos.id_visita = visitas.id_visita where visitas.id_visita = ?',[id]);
        const firmas = await pool.query('SELECT firma_tecnico, nombre_tecnico, apellido_tecnico from tecnicos INNER JOIN sectores ON sectores.id_tecnico = tecnicos.id_tecnico INNER JOIN servicios_adquiridos ON servicios_adquiridos.id_sector = sectores.id_sector where servicios_adquiridos.id_visita = ?',[id]);
        
        let firmaPrimerTecnico = firmas[0].firma_tecnico;
        let nombrePrimerTecnico = firmas[0].nombre_tecnico;
        let apellidoPrimerTecnico = firmas[0].apellido_tecnico;
        
        if(!firmas[1] || firmas[1] == "NULL"){
             firmaSegundoTecnico = "./public/blanco.png";
             nombreSegundoTecnico = "./public/blanco.png";
             apellidoSegundoTecnico = "./public/blanco.png";
        }else{
             firmaSegundoTecnico = firmas[1].firma_tecnico;
             nombreSegundoTecnico = firmas[1].nombre_tecnico;
             apellidoSegundoTecnico = firmas[1].apellido_tecnico;

        }

        

        var tablaProductos = [];
        var datosProducto = [];
        
        for(i = 0; i < datosServicios.length ; i++){
            var prod = [];
            prod = await pool.query('Select * from productos where id_servicio = ?', [datosServicios[i].id_servicio]);
            if(prod.length > 0 ) datosProducto = prod;
            tablaProductos.push({nombre_servicio : datosServicios[i].nombre_servicio, datosProducto})
        }
        

        logo_cliente = listaVisita[0].logo_cliente;
        observaciones = listaVisita[0].observaciones;
        nombreCliente = listaVisita[0].razon_social_cliente;
        fechaVisita = listaVisita[0].fecha_visita;
	  	fechaEntrada = listaVisita[0].horario_entrada;
      	fechaSalida = listaVisita[0].horario_salida
		firmaCliente = listaVisita[0].firma_cliente;
        
        direccion_sucursal = listaVisita[0].direccion_sucursal;

        pdf = {
            logo_cliente,
            direccion_sucursal,
            observaciones,
            nombreCliente,
            fechaVisita,
            fechaEntrada, 
            fechaSalida,
            firmaCliente,
            firmaPrimerTecnico,
            firmaSegundoTecnico,
            nombrePrimerTecnico,
            nombreSegundoTecnico,
            apellidoPrimerTecnico,
            apellidoSegundoTecnico,
            servicios
        }
        
        const listaFormulario = await pool.query('Select formularios.id_formulario, nombre_servicio from formularios INNER JOIN visitas ON formularios.id_visita = visitas.id_visita INNER JOIN servicios ON servicios.id_servicio = formularios.id_servicio where visitas.id_visita = ?', [id]);
        
        for(i = 0; i < listaFormulario.length ; i++){
            var nombreServicio = listaFormulario[i].nombre_servicio;
            var aux2 = nombreServicio;
            
            const listaRespuesta = await pool.query('Select nombre_equipo, nombre_campo,respuesta,respuestas.id_equipo from respuestas INNER JOIN formularios on formularios.id_formulario = respuestas.id_formulario INNER JOIN campos ON campos.id_campo = respuestas.id_campo INNER JOIN equipos ON equipos.id_equipo = respuestas.id_equipo where formularios.id_formulario = ?', [listaFormulario[i].id_formulario]);
            formulario = [];
            for(j = 0; j < listaRespuesta.length; j++){
                var aux = ' '+listaRespuesta[j].nombre_equipo;
                if(listaRespuesta[j].id_equipo != 0 && nombreServicio == aux2){
                    nombreServicio = nombreServicio + aux;
                }
                formulario.push(listaRespuesta[j]);
            }
            servicios.push({nombreServicio, formulario});
        }
        pdf = {
            logo_cliente,
            direccion_sucursal,
            observaciones,
            nombreCliente,
            fechaVisita,
            fechaEntrada, 
            fechaSalida,
            firmaCliente,
            firmaPrimerTecnico,
            firmaSegundoTecnico,
            nombrePrimerTecnico,
            nombreSegundoTecnico,
            apellidoPrimerTecnico,
            apellidoSegundoTecnico,
            servicios,
            listaServicios,
            tablaProductos
        }
        //console.log(pdf);
        return pdf
    }catch(e){
        console.log(e);
        return e;
    }
}

module.exports = {
    crearObjetoPdf
}
