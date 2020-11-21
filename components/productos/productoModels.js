const pool = require('../../config/database');

const getAllProductos = async () => {
    try{
        return await pool.query('Select * from productos where estado_producto = "alta"');
    }catch(e){
        return e
    }
}

const productoById = async (id) => {
    try{
        return await pool.query('Select * from productos where id_producto = ? and estado_producto = "alta"', [id]);
    }catch(e){
        return e;
    }
}

const nuevoProducto = async (producto) => {
    try{
        const {id_servicio, nombre_producto, fecha_vencimiento, lote, tipo_producto} = producto;
        const estado_producto = "alta";
        await pool.query('INSERT INTO productos(id_servicio, nombre_producto, fecha_vencimiento, lote, tipo_producto, estado_producto) VALUES (?,?, ?, ?, ?, ?)', [id_servicio, nombre_producto, fecha_vencimiento, lote, tipo_producto, estado_producto]);
        
    }catch(e){
        return e
    }
}

const deleteById = async (id) => {
    try{
        return await pool.query('UPDATE productos set estado_producto = "baja" where id_producto = ?', [id]);
    }catch(e){
        return e
    }
}


const updateProducto = async (producto) => {
    try{
        const {id_producto, id_servicio, nombre_producto, fecha_vencimiento , lote, tipo_producto} = producto
        await pool.query('UPDATE productos set id_servicio = ?, nombre_producto = ?, fecha_vencimiento = ?, lote = ?, tipo_producto = ? where id_producto = ?', [id_servicio, nombre_producto, fecha_vencimiento , lote, tipo_producto, id_producto]);

        return 'producto actualizado';
    }catch(e){
        return e
    }
}


module.exports = {
    getAllProductos,
    productoById,
    nuevoProducto,
    deleteById,
    updateProducto
}