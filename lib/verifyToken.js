const jwt = require('jsonwebtoken');
const secret = require('../config/environments')

function verifyToken( req, res, next){
    const token = req.headers['x-access-token'];
    if(!token){
		return res.status(401).json({status : 'error' , auth : 'false', message : 'No token provider'});
    }
    
    const decoded = jwt.verify(token, secret.SECRET);
    req.userId = decoded.id;
    next();
}


module.exports = verifyToken;