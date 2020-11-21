const servicio = require('./serviciosModels');


const getServicios = async (req, res) => {
    try{
        const servicios = await servicio.getAllServicios();
        res.status(200).json({
            status : 'OK',
            result : servicios
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}


const servicioPorId = async (req, res) => {
    try{
        const id = req.params.id;
        console.log(id);
        const response = await servicio.servicioById(id);
        if(!Object.keys(response).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el servicio'
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

const deleteServicioById = async (req, res) => {
    try{
        const id = req.params.id;
        const servicioEliminado = await servicio.deleteById(id);
        res.status(200).json({
            status : 'OK',
            servicioEliminado : servicioEliminado
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const deleteEquiposById = async (req, res) => {
    try{
        const id = req.params.id;
        const equipoEliminado = await servicio.deleteEquiposById(id);
        res.status(200).json({
            status : 'OK',
            equiposEliminado : equipoEliminado
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}




const crearServicio = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await servicio.nuevoServicio(nuevo);   
        res.status(200).json({
            status : 'OK',
            servicioCreado : nuevo 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};


//Equipos

const crearEquipos = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await servicio.nuevoEquipo(nuevo);   
        res.status(200).json({
            status : 'OK',
            equipoCreado : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};

const equiposPorIdSucursal = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await servicio.getEquiposByIdSucursal(id);
        if(!Object.keys(response).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el equipo'
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

//Offline Tables
const offlineServicios = async (req, res) => {
    try{
        const servicios = await servicio.offlineAllServicios();
        res.status(200).json({
            status : 'OK',
            result : servicios
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const offlineServiciosAdquiridos= async (req, res) => {
    try{
        const servicios = await servicio.offlineAllServiciosAdquiridos();
        res.status(200).json({
            status : 'OK',
            result : servicios
        }); 
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const offlineCampos = async (req, res) => {
    try{
        const campos = await servicio.offlineAllCampos();
        res.status(200).json({
            status : 'OK',
            result : campos
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const offlineOpciones = async (req, res) => {
    try{
        const opciones = await servicio.offlineAllOpciones();
        res.status(200).json({
            status : 'OK',
            result : opciones
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}
const offlineEquipos = async (req, res) => {
    try{
        const equipos = await servicio.offlineAllEquipos();
        res.status(200).json({
            status : 'OK',
            result : equipos
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const offlineSector = async (req, res) => {
    try{
        const sectores = await servicio.offlineSectores();
        res.status(200).json({
            status : 'OK',
            result : sectores
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
}

const crearSectores = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await servicio.nuevoSector(nuevo);   
        res.status(200).json({
            status : 'OK',
            sectorCreado : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};

module.exports = {
    getServicios,
    servicioPorId,
    crearServicio,
    offlineServicios,
    offlineServiciosAdquiridos,
    offlineCampos,
    offlineOpciones,
    offlineEquipos,
    offlineSector,
    crearEquipos,
    equiposPorIdSucursal,
    deleteServicioById,
    deleteEquiposById,
    crearSectores
}