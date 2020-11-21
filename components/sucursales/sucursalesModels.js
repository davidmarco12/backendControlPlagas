const pool = require('../../config/database');
const QRCode = require('qrcode');
Jimp = require('jimp');


const getAllSucursales = async () => {
    try{
        return await pool.query('Select * from sucursales');
    }catch(e){
        return e
    }
}

const sucursalById = async (id) => {
    try{
        const sucursal = await pool.query('Select * from sucursales where id_sucursal = ?', [id]);
        const planos = await pool.query('Select * from planos where id_sucursal = ?',[sucursal[0].id_sucursal]);
        return {
            sucursal,
            planos
        }
    }catch(e){
        return e
    }
}





const generateQR = async text => {
    try {
        const a = await QRCode.toDataURL(text, {
            width : 3,
            scale: 10
        })
        return a;
    }catch (err) {
      return(err)
    }
}



const nuevaSucursal= async (sucursal) => {
    try{
        const {id_cliente, razon_social_sucursal, direccion_sucursal, telefono_sucursal, email_sucursal} = sucursal
        const codigo_qr = '';
        const sucursales = await pool.query('INSERT INTO sucursales (id_cliente, razon_social_sucursal, direccion_sucursal, telefono_sucursal, email_sucursal, codigo_qr) VALUES (?,?, ?, ?, ?, ?)', [id_cliente, razon_social_sucursal, direccion_sucursal, telefono_sucursal, email_sucursal, codigo_qr]);
        const url = await generateQR(sucursales.insertId.toString());
        
        var buf = Buffer.from(url.replace(/^data:image\/png;base64,/, ""), 'base64');
        Jimp.read(buf)
        .then(img => {
            Jimp.loadFont(Jimp.FONT_SANS_14_BLACK).then(function(font){
                img.print(font, 0, 0, {text : razon_social_sucursal,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM},
                    270,
                    285 );
                img.greyscale().getBase64(Jimp.AUTO, (err, res) => {
                    pool.query('UPDATE sucursales set codigo_qr = ? where id_sucursal = ?',[res,sucursales.insertId]);
                });
            });
        }).catch(function(err) {
        	console.error(err);
        });
        
        //await pool.query('UPDATE sucursales set codigo_qr = ? where id_sucursal = ?',[url,sucursales.insertId]);
        return sucursales;
    }catch(e){
        console.log(e);
        return e
    }
}

const deleteById = async (id) => {
    try{
        await pool.query('DELETE FROM sucursales where id_sucursal = ?', [id]);

        return 'sucursal eliminada'
    }catch(e){
        return e
    }
}

const updateSucursal = async(sucursal) => {
    try{
        const {id_sucursal, id_cliente, razon_social_sucursal, direccion_sucursal, email_sucursal, telefono_sucursal} = sucursal;
        await pool.query('UPDATE sucursales set id_cliente = ?, razon_social_sucursal = ?, direccion_sucursal = ?, email_sucursal = ?, telefono_sucursal = ? where id_sucursal = ?',[id_cliente, razon_social_sucursal, direccion_sucursal, email_sucursal, telefono_sucursal,  id_sucursal]);

        return 'sucursal actualizada';
    }catch(e){
        return e;
    }
} 


//offline
const offlineAllSucursales = async (req,res) => {
    try{
        return await pool.query('Select * from sucursales');
    }catch(e){
        return e;
    }
}


module.exports = {
    getAllSucursales,
    nuevaSucursal,
    sucursalById,
    offlineAllSucursales,
    deleteById,
    updateSucursal
}