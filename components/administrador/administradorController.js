const express = require('express');
const router = express.Router();
const pool = require('../../config/database');
const helpers = require('../../lib/helpers');
const jwt = require('jsonwebtoken');
const secret = require('../../config/environments');

router.post('/signin', async (req, res, next) => {
	try {
		const {nombre, psw_admin} = req.body;
		const response = await pool.query('Select * from administrador where nombre = ?', [nombre]);
		if(response.length < 1){
			return res.status(404).json({status : 'error', message : 'no existe usuario'});
		}
		const validPassword = await helpers.matchPassword(psw_admin,response[0].psw_admin );
		if(!validPassword){
			return res.status(401).json({
				status : 'ERROR',
				message : 'Contrasenia incorrecta',
				token : null,
				auth : false
			});
		}
		const token = jwt.sign({id : response[0].id_administrador}, secret.SECRET,{
			expiresIn : 60 * 60 * 24
		})

		return res.json({status : 'OK', result : 'USUARIO CONECTADO', auth: true, token : token});
	}catch(e){
		console.log(e);
		return res.json({error: e});
	}
});

router.post('/signup', async (req, res, next) => {
	try{
		const {nombre, psw_admin, telefono_admin, email_admin } = req.body;
		const pwNueva = await helpers.encryptPassword(psw_admin);
		const response = await pool.query('Insert into administrador(nombre, psw_admin, telefono_admin, email_admin) VALUES(?,?,?,?)', [nombre, pwNueva, telefono_admin, email_admin]);

		const token = jwt.sign({id: response.insertId}, secret.SECRET, {
			expiresIn : 60 * 60 * 24
		});
		res.json({status : 'OK', result : 'Organizacion Registrada', auth: 'true', token : token});
	}catch(e){
		res.json({error : e});
	}
	
});



module.exports = router;