var express = require('express');
var PUBLICSITE = require('../config/environments');
var router = express.Router();
const pdfModel = require('../components/pdf/pdfModels');
var createCharts = require('../lib/createCharts');

//const publicURL = 'appbackendcpa.herokuapp.com/public/pdfs/formulario-'
const publicURL = 'http://157.230.90.222:3000/public/pdfs/formulario-'
//const publicURL = 'localhost:3000/public/pdfs/formulario-'

//const publicURL = PUBLICSITE.PUBLICSITE+'/public/pdfs/formulario-';


router.post('/create-pdf', async (req, res) => {
    try{
        const {id_visita} = req.body;
        var wksLista = [];
        var equiposUVLista = [];
        var serviciosExistentes = [];
        var serviciosAdquiridos = [];
        var listaSectores = [];
        var listaInsectos = [];
        var listaProcedimientos = [];
        var listaSectorestxt = '';
        var listaInsectostxt = '';
        var listaProcedimientostxt = '';
        
        const objetoPdf = await pdfModel.crearObjetoPdf(id_visita);
        
        var desinsectacionLista = [];
        var logoCliente = objetoPdf.logo_cliente;
        const longLista = objetoPdf.servicios.length;
        const observaciones = objetoPdf.observaciones;
        const nombreCliente = objetoPdf.nombreCliente;
        const fechaVisita = objetoPdf.fechaVisita;
        const fechaEntrada = objetoPdf.fechaEntrada;
        const firmaPrimerTecnico = objetoPdf.firmaPrimerTecnico;
        const firmaSegundoTecnico = objetoPdf.firmaSegundoTecnico;
        const nombrePrimerTecnico = objetoPdf.nombrePrimerTecnico;
        const nombreSegundoTecnico = objetoPdf.nombreSegundoTecnico;
        const apellidoPrimerTecnico = objetoPdf.apellidoPrimerTecnico;
        const apellidoSegundoTecnico = objetoPdf.apellidoSegundoTecnico;
 
        const fechaSalida = objetoPdf.fechaSalida;
        const firmaCliente = objetoPdf.firmaCliente;
        const direccionSucursal = objetoPdf.direccion_sucursal;
        const listaServicios = objetoPdf.listaServicios;
        var productos = objetoPdf.tablaProductos;

        

        var ultimaPagina;
        captura = 0;
        intacto = 0;
        deteriorado = 0;
        consumido = 0;
        nuevo = 0;
        obstruido = 0;

        bueno = 0;
        reemplazado = 0;


        
        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject  = {};
       
            for(var i in originalArray) {
               lookupObject[originalArray[i][prop]] = originalArray[i];
            }
       
            for(i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
             return newArray;
        }
        
        for(i = 0; i < listaServicios.length; i++){
            serviciosExistentes.push(listaServicios[i].nombre_servicio);
        }

        for(i = 0; i < objetoPdf.servicios.length; i++){
            serviciosAdquiridos.push(objetoPdf.servicios[i].nombreServicio);
        }

        for(i = 0; i < serviciosExistentes.length; i++ ){
            for(j = 0; j < serviciosAdquiridos.length; j++){
                if(serviciosAdquiridos[j] == serviciosExistentes[i] )
                    serviciosExistentes[i] = serviciosExistentes[i] + ' - SI'
            }
        }

        for( i = 0; i < serviciosExistentes.length; i++){
            if(!serviciosExistentes[i].split(/\s+|\./).includes('SI'))
                serviciosExistentes[i] = serviciosExistentes[i] + '  NO';
        }
        
        
        for(i = 0 ; i < serviciosAdquiridos.length; i++){
            if(serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('desratizacion')){
                for(x = 0; x < serviciosExistentes.length ; x++ ){
                    if(serviciosExistentes[x].toLowerCase().split(/\s+|\./).includes('desratizacion') && !serviciosExistentes[x].split(/\s+|\./).includes('si')){
                        serviciosExistentes[x] = 'Desratizacion  SI' 
                    }

                }
            }
            if(serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('equipos')){
                
                for(x = 0; x < serviciosExistentes.length ; x++ ){
                    if(serviciosExistentes[x].toLowerCase().split(/\s+|\./).includes('equipos') && !serviciosExistentes[i].split(/\s+|\./).includes('si')){
                        serviciosExistentes[x] = 'Equipos UV' + ' - SI'
                    }
                }
            }
        }
        var desratizacionEnable = '';
        var equiposEnable = '';
        var desinsectacionEnable = '';
        var relevamientoEnable = '';
        for(i = 0; i < serviciosExistentes.length; i++){
            if(serviciosExistentes[i].toLowerCase().split(/\s+|\./).includes('equipos')) equiposEnable = serviciosExistentes[i]
            if(serviciosExistentes[i].toLowerCase().split(/\s+|\./).includes('desratizacion')) desratizacionEnable = serviciosExistentes[i]
            if(serviciosExistentes[i].toLowerCase().split(/\s+|\./).includes('desinsectacion')) desinsectacionEnable = serviciosExistentes[i]
            if(serviciosExistentes[i].toLowerCase().split(/\s+|\./).includes('relevamiento')) relevamientoEnable = serviciosExistentes[i]
        }

        const serviciosExistentesAux = [...new Set(serviciosExistentes)];
        
        
        

        for(i = 0; i < longLista; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('desratizacion')){
                wksLista.push(objetoPdf.servicios[i]) 
            }
        }
        
        var observacionesServicio = '';
        for(i = 0; i < longLista; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('observaciones')){
                observacionesServicio = objetoPdf.servicios[i].formulario[0].respuesta;
            }
        }

        for(i = 0; i < longLista; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('equipos')){
                equiposUVLista.push(objetoPdf.servicios[i])
            }
        }

        for(i = 0; i < longLista; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('desinsectacion')){
                desinsectacionLista.push(objetoPdf.servicios[i])
            }
        }

        for(i = 0; i < productos.length; i++){
            
            for(j = 0; j < productos[i].datosProducto.length; j++){
                productos[i].datosProducto[j]["cantidad_producto"] = 0;
            }
        }
        

        var listaCebo = [];
        var listaPuesto = [];
        var listaProducto = [];
        
        if(wksLista.length > 0){
            for(i = 0; i < wksLista.length; i++){
                for(j = 0; j < wksLista[i].formulario.length; j++){
                    if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('cebo')){
                        listaCebo.push(wksLista[i].formulario[j].respuesta)
                    }
                    if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('puesto')){
                        listaPuesto.push(wksLista[i].formulario[j].respuesta)
                    }
                    if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('producto')){
                        listaProducto.push(wksLista[i].formulario[j].respuesta)
                        
                    }
                }
            }
        }


        if(wksLista.length > 0){
            for(i = 0; i < wksLista.length; i++){
                    for(j = 0; j < wksLista[i].formulario.length; j++){
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('cebo')){
                            
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('intacto')) intacto += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('deteriorado')) deteriorado += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('consumido')) consumido += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('nuevo')) nuevo += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('obstruido')) obstruido += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('captura')) captura += 1
                        }
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('puesto')){
                            
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('bueno')) bueno += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('reemplazado')) reemplazado += 1

                        }
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('productos')){
                            
                        }
                    }
            }
            
        }

        
        
        for(i = 0; i < listaProducto.length; i++){
            var cantidad = 0;
            for(j = 0; j < productos.length; j++){
                for(x = 0; x < productos[j].datosProducto.length; x++){
                    
                    if(listaProducto[i] == productos[j].datosProducto[x].tipo_producto){
                        productos[j].datosProducto[x].cantidad_producto++;
                    }
                }
            }
        }
        
        if(logoCliente == "NULL" || !logoCliente){
            logoCliente = './public/blanco.png';
        }

        var fonts = {
                Roboto: {
                  normal: 'fonts/Roboto-Regular.ttf',
                  bold: 'fonts/Roboto-Medium.ttf',
                  italics: 'fonts/Roboto-Italic.ttf',
                  bolditalics: 'fonts/Roboto-MediumItalic.ttf'
                }
          };
        
        var PdfPrinter = require('pdfmake');
        var printer = new PdfPrinter(fonts);
        var fs = require('fs');
        
        
        
        var dd = {
            pageSize: 'A4',
            pageMargins: [40, 80, 40, 60],
            header:{
                //margin: 5,
                columns: [
                    {image: './public/logocpa.png', fit: [250, 250] },
                    {image: logoCliente, fit: [80, 80], margin:[150,0,0,0]}
                    
                ]
            },
            footer: function(currentPage, pageCount) {
                ultimaPagina = pageCount
                if (currentPage == pageCount){
                    return {
                        columns: [
                            {image:firmaCliente, fit: [120, 120],  margin: [45, -70, 0, 0]},
                            {text : 'Aclaracion Cliente:'+nombreCliente, margin: [-120, -25, 0, 0], style :'general'},
                            {image:firmaPrimerTecnico, fit: [120, 120],  margin: [45, -70, 0, 0]},
                            {text: 'Aclaracion Tecnico:'+apellidoPrimerTecnico+' '+nombrePrimerTecnico, margin: [-140, -25, 0, 0], style :'general'}
                        ]
                    }
                }
                    return {
                        columns : [
                            //{image:'./public/footer.png', fit: [600,200], margin:[0,-20,0,0]}
                        ]
                    }
                
            },
            background: function(currentPage) {
                    return {image:'./public/footer.png', fit: [600,100], margin:[0,767,0,0]}
                
            },
            content: [
                {
                    table : {
                        widths: [250,250],
                        headerRows: 2,
                        body : [
                            [{text : 'Informe de Servicio', style : 'filledHeader', colSpan: 2, alignment: 'center', border:[false,false,false,true]}, {}],
                            [{text : 'Razon Social:'+nombreCliente,border:[false,false,false,false],style :'general'},{text : 'Emitido dia:'+fechaVisita, border:[false,false,false,false],style :'general'}],
                            [{text: 'Direccion:'+direccionSucursal,border:[false,false,false,false],style :'general'},{text : 'Numero de Servicio:  '+id_visita, colSpan:1, border:[false,false,false,false] ,style :'general'}],
                            [{text: '', border:[false,false,false,false]}, {text:'Tecnico:'+apellidoPrimerTecnico+' '+nombrePrimerTecnico,border:[false,false,false,false],style :'general'}],
                            [{text: '', border:[false,false,false,false]}, {text :'Horario de Entrada:'+fechaEntrada,border:[false,false,false,false],style :'general'}],                           
                            [{text: '', border:[false,false,false,false]}, {text: 'Horario de Salida:'+fechaSalida,border:[false,false,false,false],style :'general'}],
                            
                        ]
                    }
                }
            ],
            styles: {
                filledHeader: {
                    bold: true,
                    fontSize: 9,
                    color: 'black',
                    fillColor: '#8db4e2',
                    alignment: 'center'
                    },
                general :{
                    bold: false,
                    fontSize: 9,
                    //alignment : 'center'
                }
            }
        }
        
        
        //Servicios Realizados en este servicio
        dd.content.push({
            margin: [0, 0, 0, 0],
            text : '',
        })

        var table = {
            widths: [250,250],
            headerRows: 1,
            body : [
                [{text : 'Servicios realizados en este servicio', alignment: 'center', style: 'filledHeader', colSpan:2, border:[false,false,false,true]}, {}],
                [{text: desinsectacionEnable, style:'general'},{text: equiposEnable, style:'general'}],
                [{text: desratizacionEnable, style:'general'},{text: relevamientoEnable, style:'general'}]
            ]
        };
        dd.content.push({
            table
        });

        dd.content.push({text:'\nOBSERVACIONES:'+observacionesServicio , style :'general'});
        
        
        var cantidadTotal = 0;
        
        
        
        
        var prodDesratizacion = [];
        var prodDesin = [];
        var prodDesAux = [];
        var prodDesnAux = [];
        if(productos.length > 0){
            for(i = 0; i < productos.length; i++){
                if(productos[i].nombre_servicio.toLowerCase().split(/\s+|\./).includes('desratizacion')){
                    for(j = 0; j < listaProducto.length; j++){
                        for(x = 0; x < productos[i].datosProducto.length; x++ ){
                            if(listaProducto[j] == productos[i].datosProducto[x].tipo_producto){
                                prodDesratizacion.push({nombre_servicio: productos[i].nombre_servicio, datosProducto: productos[i].datosProducto[x]});
                            }
                            
                        } 
                    
                    }
                    
                }
                if(productos[i].nombre_servicio.toLowerCase().split(/\s+|\./).includes('desinsectacion')){
                    
                    for(j = 0; j < desinsectacionLista.length; j++){
                        for(x = 0; x < desinsectacionLista[j].formulario.length; x++){
                            for(y = 0; y < productos[i].datosProducto.length; y++){
                                if(desinsectacionLista[j].formulario[x].respuesta == productos[i].datosProducto[y].tipo_producto){
                                    prodDesin.push({nombre_servicio:productos[i].nombre_servicio , datosProducto: productos[i].datosProducto[y]});
                                }
                            }
                        }
                    }
                    
                }
            }
        }

        
        if(prodDesratizacion.length > 0)
        for(i = 0; i < prodDesratizacion.length; i++){
            prodDesAux.push(prodDesratizacion[i].datosProducto);  
        }
        
        
        if(prodDesin.length > 0)
            for(i = 0; i < prodDesin.length; i++){
                prodDesnAux.push(prodDesin[i].datosProducto);
            }
        listaSinRepetirDesratizacion =  removeDuplicates(prodDesAux,"nombre_producto"); 
        listaSinRepetirDesinsectacion =  removeDuplicates(prodDesnAux,"nombre_producto");
        if(prodDesratizacion.length > 0){
            
            dd.content.push({
                margin: [0, 0, 0, 0],
                text : '',
            })
            var table = {
                widths: [125,125,125,100],
                headerRows: 1, 
                body : [
                    [{text : 'Productos en Desratizacion', alignment: 'center',colSpan: 4,  border:[false,false,false,true] ,style :'filledHeader'}, {}, {}, {}],
                    [{text: 'PRODUCTO' ,style :'general',bold: true, fillColor: '#a8a8a8'}, {text : 'CANTIDAD',style :'general',bold: true, fillColor: '#a8a8a8'}, {text:'N° de LOTE',style :'general',bold: true, fillColor: '#a8a8a8'}, {text: 'VENCIMIENTO',style :'general',bold: true, fillColor: '#a8a8a8'}]
                ]
            }
            
            for(i = 0; i < listaSinRepetirDesratizacion.length ; i++){
                
                table.body.push([{text : listaSinRepetirDesratizacion[i].nombre_producto,style :'general' }, {text : listaSinRepetirDesratizacion[i].cantidad_producto,style :'general'}, {text : listaSinRepetirDesratizacion[i].lote,style :'general'}, {text: listaSinRepetirDesratizacion[i].fecha_vencimiento,style :'general'}]);
                cantidadTotal += listaSinRepetirDesratizacion[i].cantidad_producto;
            }
            dd.content.push({
                table
            }); 
        }
        //(cantidadTotal)
        if(cantidadTotal > 0) dd.content.push({
            text : 'Total de los puestos controlados :'+cantidadTotal ,style :'general',bold: true});
         
        
        if(prodDesin.length > 0){
            dd.content.push({
                margin: [0, 0, 0, 0],
                text : '',
            })
            var table = {
                widths: [150,150,185],
                headerRows: 1,
                body : [
                    [{text : 'Productos en Desinsectacion', alignment: 'center',colSpan: 3,  border:[false,false,false,true],style :'filledHeader'}, {}, {}],
                    [{text: 'PRODUCTO',style :'general', bold: true, fillColor: '#a8a8a8'}, {text:'N° de LOTE',style :'general', bold: true, fillColor: '#a8a8a8'}, {text: 'VENCIMIENTO',style :'general', bold: true, fillColor: '#a8a8a8'}]
                ]
            }
            for(i = 0; i < listaSinRepetirDesinsectacion.length ; i++){
                
                table.body.push([{text : listaSinRepetirDesinsectacion[i].nombre_producto,style :'general'},  {text: listaSinRepetirDesinsectacion[i].lote,style :'general'}, {text : listaSinRepetirDesinsectacion[i].fecha_vencimiento,style :'general'}]);
                
                
            }

            dd.content.push({
                unbreakable: true,
                table
            }); 
        }
        
        //Relevamiento de Instalaciones
        for(i = 0; i < objetoPdf.servicios.length; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('relevamiento')){
                dd.content.push({
                    margin: [0, 20, 0, 0],
                    text : '',
                })
                var table = {
                    widths: [250,250,150],
                    headerRows: 1,
                    unbreakable: true,
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    body : [
                        [{text : 'Relevamiento de Instalaciones', alignment: 'center',colSpan: 2, style: 'filledHeader', border:[false,false,false,true]}, {}],
                        [{text : 'Revision' ,style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'Estado',style :'general',bold: true, fillColor: '#a8a8a8'}]
                    ]
                };
                for(j = 0 ; j < objetoPdf.servicios[i].formulario.length; j++){
                    table.body.push([{text: objetoPdf.servicios[i].formulario[j].nombre_campo,style :'general'},{text: objetoPdf.servicios[i].formulario[j].respuesta,style :'general'}])
                }

                dd.content.push({
                    table
                });
            }
            //break;     
        }

        
        for(i = 0; i < objetoPdf.servicios.length; i++){
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('desratizacion')){
                dd.content.push({
                    margin: [0, 20, 0, 0],
                    text : '',
                })
                var table = {
                    widths: [250,250,150],
                    headerRows: 1,
                    unbreakable: true,
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    body : [
                        [{text : 'Resumen general - Servicio Desratizacion', colSpan: 2, style: 'filledHeader', border:[false,false,false,true]}, {}],
                        [{text : 'ESTADO GENERAL DE LOS PUESTOS' ,style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'ESTADO GENERAL DE LOS CEBOS',style :'general',bold: true, fillColor: '#a8a8a8'}],
                        [{text : 'Bueno:'+bueno,style :'general' },{text : 'Intacto:'+intacto,style :'general'}],
                        [{text : 'Reemplazado:'+reemplazado ,style :'general'},{text : 'Deteriorado:'+deteriorado,style :'general'}],
                        [{},{text : 'Consumido:'+consumido,style :'general'}],
                        [{},{text : 'Nuevo:'+nuevo,style :'general'}],
                        [{},{text : 'Obstruido:'+obstruido,style :'general'}],
                        [{},{text : 'Captura:'+captura, style :'general'}]
                    ]
                };
                

                dd.content.push({
                    table
                });

                break;
            }
                 
        }

        captura = 0;
        intacto = 0;
        deteriorado = 0;
        consumido = 0;
        nuevo = 0;
        obstruido = 0;

        bueno = 0;
        reemplazado = 0;

        //Lista de desinsectacion
        for(i = 0; i < longLista; i++){
            
            if(objetoPdf.servicios[i].nombreServicio.toLowerCase().split(/\s+|\./).includes('desinsectacion')){
                dd.content.push({
                    margin: [0, 20, 0, 0],
                    text : '\n',
                })
                
                for(j = 0; j <objetoPdf.servicios[i].formulario.length; j++  ){
                    if(objetoPdf.servicios[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('sectores')) 
                        listaSectores.push(objetoPdf.servicios[i].formulario[j].respuesta);
                    if(objetoPdf.servicios[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('procedimientos'))
                        listaProcedimientos.push(objetoPdf.servicios[i].formulario[j].respuesta);
                    if(objetoPdf.servicios[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('insectos') || objetoPdf.servicios[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('plagas') )
                        listaInsectos.push(objetoPdf.servicios[i].formulario[j].respuesta);
                }
                var table = {
                    widths: [160,160,160],
                    headerRows: 1,
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    body : [
                        [{text : 'Servicio de Desinsectacion', alignment: 'center',colSpan: 3, style: 'filledHeader', border:[false,false,false,true]}, {}, {}],
                        [{text : 'Sector',style :'general',bold: true, fillColor: '#a8a8a8'}, {text : 'Insecto / Plaga',style :'general',bold: true, fillColor: '#a8a8a8'}, {text : 'Procedimiento',style :'general',bold: true, fillColor: '#a8a8a8'}],
                        [{},{},{}]
                    ]
                };

                for(x = 0; x < listaSectores.length ; x ++){
                    listaSectorestxt += listaSectores[x] + ' - ';
                }
                for(x = 0; x < listaProcedimientos.length ; x ++){
                    listaProcedimientostxt +=  listaProcedimientos[x] + ' - ' ;
                }
                for(x = 0; x < listaInsectos.length ; x ++){
                    listaInsectostxt += listaInsectos[x] + ' - ';
                }
                
                table.body[2][0] = {text : listaSectorestxt ,style :'general'};
                table.body[2][1] = {text : listaInsectostxt,style :'general'};
                table.body[2][2] = {text : listaProcedimientostxt,style :'general'};

                dd.content.push({
                    table
                });
                
            }  
        }
        
        //WORKSTATIONS
        
        
        var listaCebo = [];
        var listaPuesto = [];
        var listaProducto = [];
        

        if(wksLista.length > 0){
            dd.content.push({
                margin: [0, 20, 0, 0],
                text : '\n',
            })
            var table = {
                widths: ['auto','*','*','*','*'],
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                body : [
                    [{text : 'Servicio Desratizacion', alignment: 'center',colSpan: 5, style: 'filledHeader', border:[false,false,false,true]}, {}, {}, {},{}],
                    [{text : 'Puesto',colSpan: 3,style :'general',bold: true, fillColor: '#a8a8a8'}, {}, {}, {text : 'Cebo', colSpan: 2,style :'general',bold: true, fillColor: '#a8a8a8'}, {}],
                    [{text : 'Posicion',style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'Tipo',style :'general',bold: true, fillColor: '#a8a8a8'},{text: 'Estado',style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'Tipo',style :'general',bold: true, fillColor: '#a8a8a8'},{text: 'Estado',style :'general',bold: true, fillColor: '#a8a8a8'}]
                ]
            };

            
            for(i = 0; i < wksLista.length; i++){
            
                    for(j = 0; j < wksLista[i].formulario.length; j++){
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('cebo')){
                            listaCebo.push(wksLista[i].formulario[j].respuesta);
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('intacto')) intacto += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('deteriorado')) deteriorado += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('consumido')) consumido += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('nuevo')) nuevo += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('obstruido')) obstruido += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('captura')) captura += 1
                        }
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('puesto')){
                            listaPuesto.push(wksLista[i].formulario[j].respuesta)
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('bueno')) bueno += 1
                            if(wksLista[i].formulario[j].respuesta.toLowerCase().split(/\s+|\./).includes('reemplazado')) reemplazado += 1

                        }
                        if(wksLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('producto')){
                            listaProducto.push(wksLista[i].formulario[j].respuesta)
                        }
                    }
                                                                                     //text : productos[x].tipo_producto
                    table.body.push([{text : wksLista[i].nombreServicio ,style :'general'},{text: 'Workstation',style :'general'},{text: listaPuesto[i],style :'general'},{text: listaProducto[i],style :'general'},{text: listaCebo[i],style :'general'}])
                    
                
            }
            dd.content.push({
                //unbreakable: true,
                table,
                //layout: 'lightHorizontalLines'
            });
        }

        //Equipos - UV
        var saturacion = [];
        var encendido = [];
        var medicion = [];
        var observacion = [];

        if(equiposUVLista.length > 0){
            dd.content.push({
                margin: [0, 20, 0, 0],
                text : '\n',
            })
            var table = {
                widths: [160,70,60,60,120],
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                body : [
                    [{text : 'Servicio: Equipos UV', alignment: 'center',colSpan: 5, style: 'filledHeader', border:[false,false,false,true]}, {}, {}, {},{}],
                    [{text : 'Descripcion del equipo',style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'Saturacion/Conteo',style :'general',bold: true, fillColor: '#a8a8a8'},{text: 'Encendido',style :'general',bold: true, fillColor: '#a8a8a8'},{text : 'Medicion',style :'general',bold: true, fillColor: '#a8a8a8'},{text: 'Observacion',style :'general',bold: true, fillColor: '#a8a8a8'}],
                ]
            };

            for(i = 0; i < equiposUVLista.length; i++){
                for(j = 0; j < equiposUVLista[i].formulario.length; j++){
                    if(equiposUVLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('saturacion')){
                        saturacion.push(equiposUVLista[i].formulario[j].respuesta)
                    }
                    if(equiposUVLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('encendido')){
                        encendido.push(equiposUVLista[i].formulario[j].respuesta)
                    }
                    if(equiposUVLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('medicion')){
                        /*
                        var fillColor = '';
                        if(equiposUVLista[i].formulario[j].respuesta < 4){
                            fillColor = '#FF0000';
                        }
                        else if(equiposUVLista[i].formulario[j].respuesta > 7){
                            fillColor = '#008000';
                        }
                        else fillColor = '#FFFF00';
                        */
                       medicion.push(equiposUVLista[i].formulario[j].respuesta)
                    }
                    if(equiposUVLista[i].formulario[j].nombre_campo.toLowerCase().split(/\s+|\./).includes('observacion')){
                        observacion.push(equiposUVLista[i].formulario[j].respuesta)
                    }
                }
            }
            
            for(i = 0; i < saturacion.length; i++){
                var fillColor = '';
                if(medicion[i] < 4){
                    fillColor = '#FF0000';
                }
                else if(medicion[i] > 6){
                    fillColor = '#008000';
                }
                else fillColor = '#FFFF00';
                table.body.push([{text: equiposUVLista[i].nombreServicio ,style :'general'},{text : saturacion[i],style :'general'}, {text : encendido[i],style :'general'}, {text : medicion[i], fillColor,style :'general'}, {text : observacion[i],style :'general'}]);
            }




            dd.content.push({
                table,
                //layout: 'lightHorizontalLines'
            });

            var table = {
                widths: [60,40,80,40,80,40,110],
                headerRows: 1,
                dontBreakRows: true,
                keepWithHeaderRows: 1,
                body : [
                    [{text: "Medicion Radiacion UV",alignment:'center', fillColor: '#a8a8a8'},{text:"1-2-3", fillColor :'#FF0000',alignment:'center' },{text:"Inadecuado-Cambiar Tubos UV",alignment:'center'},{text: "4-5-6",alignment:'center', fillColor : '#FFFF00',alignment:'center'},{text:"Se acerca cambios de tubo"},{text:"7-8-9 - 10",alignment:'center', fillColor: '#008000',alignment:'center'},{text:"Bien-Satisfactorio",alignment:'center'}]
                ]
            };

            dd.content.push({
                table,
                //layout: 'lightHorizontalLines'
            });

        }



        //Servicio NUEVO
        
        for( i = 0; i < longLista ; i++){
            servicioNuevo = [];
            if(!serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('desratizacion') && !serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('desinsectacion') && !serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('relevamiento') && !serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('equipos') && !serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('observaciones')){

                dd.content.push({
                    margin: [0, 20, 0, 0],
                    text : '\n',
                })
                var table = {
                    widths: [250,250],
                    headerRows: 1,
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    body : []
                };
                table.body.push([{text :objetoPdf.servicios[i].nombreServicio, colSpan: 2, style:  'filledHeader', border:[false,false,false,true] },{}])
                table.body.push([{text : 'Seccion', style :'general'}, {text : 'Estado',style :'general'}]);
                for(j = 0 ; j < objetoPdf.servicios[i].formulario.length; j++){
                    table.body.push([{text: objetoPdf.servicios[i].formulario[j].nombre_campo,style :'general'},{text: objetoPdf.servicios[i].formulario[j].respuesta,style :'general'}])
                }
                dd.content.push({
                    table,
                    //layout: 'lightHorizontalLines'
                });
            }
        }

        listaDePuestosParaTorta = [bueno, reemplazado];
        listaDeCebosParaTorta = [intacto, deteriorado, consumido, nuevo, obstruido, captura]
        puestoTexto = ["Bueno", "Reemplazado"];
        ceboTexto = ["Intacto", "Deteriorado", "Consumido", "Nuevo", "Obstruido", "Captura"];
        texto = 'cebos';
        

        
        for(i = 0; i < serviciosAdquiridos.length; i++){
            if(serviciosAdquiridos[i].toLowerCase().split(/\s+|\./).includes('desratizacion')){
                texto = "puestos"
                await createCharts.generate_plot(listaDePuestosParaTorta,puestoTexto, id_visita, texto);
                texto = "cebos"
                await createCharts.generate_plot(listaDeCebosParaTorta,ceboTexto, id_visita, texto);
                
                
                dd.content.push({
                    margin: [0, 20, 0, 0],
                    text : '\n',
                })
                var table = {
                    widths: [64,64,64,64,64,64,64],
                    headerRows: 1,
                    dontBreakRows: true,
                    keepWithHeaderRows: 1,
                    body : []
                };
                table.body.push([{text : 'Graficos / Estadisticas', colSpan: 7, alignment: 'center', style:  'filledHeader', border:[false,false,false,true]}, {} , {}, {}, {}, {}, {}])
                
                table.body.push([{text : 'Estado general de los puestos', colSpan: 7, style:  'filledHeader', border:[false,false,false,true]}, {}, {}, {}, {}, {}, {}])
                table.body.push([{text : 'Bueno',style :'general', colSpan: 2 }, {}, {text: 'Reemplazado',style :'general', colSpan: 3}, {}, {}, {text: 'Total Puestos',style :'general', colSpan: 2}, {}]);
                table.body.push([{text : bueno,style :'general',colSpan: 2}, {}, {text: reemplazado,style :'general',colSpan: 3}, {}, {}, {text: listaDePuestosParaTorta.reduce((a, b) => a + b, 0),style :'general',colSpan: 2}, {}]);
                table.body.push([{
                    image: './public/chart-puestos'+id_visita+'.png',
                    fit: [250, 250],
                    colSpan: 7,alignment: 'center'},
                    {} , {}, {}, {}, {}, {}
                ]);
                table.body.push([{text : 'Estado general de los cebos', colSpan: 7, alignment: 'center', style:  'filledHeader', border:[false,false,false,true]}, {}, {}, {}, {}, {}, {}])
                table.body.push([{text : 'Intacto',style :'general'}, {text: 'Deteriorado',style :'general'}, {text: 'Consumido',style :'general'}, {text : 'Nuevo',style :'general'}, {text: 'Obstruido',style :'general'}, {text: 'Captura',style :'general'}, {text : 'Total de Cebos',style :'general'}]);
                table.body.push([{text : intacto,style :'general'},{text : deteriorado,style :'general'}, {text : consumido,style :'general'}, {text : nuevo,style :'general'}, {text: obstruido,style :'general'}, {text : captura,style :'general'}, {text: listaDeCebosParaTorta.reduce((a, b) => a + b, 0),style :'general'}]);
                table.body.push([{
                    image: './public/chart-cebos'+id_visita+'.png',
                    fit: [250, 250],
                    colSpan: 7, alignment: 'center'},
                    {} , {}, {}, {}, {}, {} 
                ]);

                
                dd.content.push({
                    unbreakable: true,
                    table,
                    //layout: 'lightHorizontalLines'
                });
                
                
                
                
                break;
            }
        }



        
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(fs.createWriteStream('./public/pdfs/formulario-' + id_visita + '.pdf'))
        .on('finish', function(){
            res.status(200).json({
                status : 'OK',
                result : 'pdf creado',
                objetopdf:objetoPdf.servicios
            })
        });

        pdfDoc.end();
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            status : 'error',
            message : 'Problema al general el PDF'
        })
    }
    
});

router.get('/fetch-pdf/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        status : 'OK',
        url : publicURL+id+'.pdf'
    });
})


module.exports = router;
