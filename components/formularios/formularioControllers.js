const formulario = require('./formularioModels');

const crearRespuesta = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await formulario.nuevasRespuestas(nuevo);
        res.status(200).json({
            status : 'OK',
            respuestaAgregada : response 
        });
    }catch(e){
        console.log(e);
    }
};

const crearFormulario = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await formulario.nuevoFormulario(nuevo);
        res.status(200).json({
            status : 'OK',
            formularioAgregado : response 
        });
    }catch(e){
        console.log(e);
    }
};

module.exports = {
    crearRespuesta,
    crearFormulario
}