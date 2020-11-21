const email = require('./index');

const enviarEmails = async (req, res) => {
    try{
        const nuevo = req.body;
        const response = await email.enviarEmail(nuevo);   
        res.status(200).json({
            status : 'OK',
            emailEnviado : response 
        });
    }catch(e){
        res.status(500).json({
            status : 'error',
            result : e
        });
    }
};

module.exports = {
    enviarEmails
}