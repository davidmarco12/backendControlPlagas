module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            console.log("ESTAS CONECTADO");
            return next();
        }
        return res.json({
            status : 'Error',
            message : 'NO ESTAS AUTORIZADO'
        });
    }
};