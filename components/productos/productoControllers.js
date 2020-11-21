const producto = require('./productoModels');


const getProductos = async (req, res) => {
    const productos = await producto.getAllProductos();
    res.status(200).json({
        status : 'OK',
        result : productos
    });
}

const productoPorID = async (req, res) => {
    try{
        const id = req.params.id;
        const productoID = await producto.productoById(id);
        if(!Object.keys(productoID).length){
            res.status(200).json({
                status : 'error',
                message : 'No se encuentra el producto'
            });
        }
        else{
            res.status(200).json({
                status : 'OK',
                result : productoID
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}

const crearProducto = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await producto.nuevoProducto(nuevo);   
        res.status(200).json({
            status : 'OK',
            productoCreado : nuevo 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};

const eliminarProducto = async (req, res) => {
    try{
        const id = req.params.id;
        const productoEncontrado = await producto.productoById(id);
        if(!Object.keys(productoEncontrado).length){
            res.status(500).json({
                status : 'error',
                message : 'No se puede borrar un producto inexistente'
            });
        }
        else{
            await producto.deleteById(id);
            res.status(200).json({
                status : 'OK',
                productoEliminado : productoEncontrado
            });
        }
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


const actualizarProducto = async (req, res) => {
    try{
        const productos = req.body;
        const respuesta = await producto.updateProducto(productos);
        res.status(200).json({
            status : 'OK',
            productoActualizado : respuesta
        });
    }catch(e){
        res.status(500).json({
            status : 'Error',
            message : e
        });
    } 
}


module.exports = {
    getProductos,
    productoPorID,
    crearProducto,
    eliminarProducto,
    actualizarProducto
}