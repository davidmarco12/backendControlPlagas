const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../config/database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField : 'nombre',
    passwordField : 'psw_admin',
    passReqToCallback : true
}, async (req, username, password, done) => {
    const rows = await pool.query('Select * from administrador where nombre = ?', [username]);
    if(rows.length > 0){
        const administrador = rows[0];
        const validPassword = await helpers.matchPassword(password, administrador.psw_admin);
        if(validPassword){
            console.log('Bienvenido');
            done(null, administrador);
        }else{
            console.log('Contraseña incorrecta');
            done(null, false, {message : 'contraseña incorrecta'});
        }
    }else{
        console.log('El usuario no existe');
        return done(null, false, {message : 'el usuario no existe'});
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField : 'nombre',
    passwordField : 'psw_admin',
    passReqToCallback : true
}, async (req, username, password, done) => {
    const {email_admin, telefono_admin} = req.body;
    const newAdmin = {
        nombre: username,
        psw_admin : password,
        email_admin,
        telefono_admin
    };
    newAdmin.psw_admin = await helpers.encryptPassword(newAdmin.psw_admin);
    const result = await pool.query('INSERT INTO administrador SET ?', [newAdmin]);
    newAdmin.id_administrador = result.insertId;
    return done(null, newAdmin);
}));


passport.serializeUser((user, done) =>{
    done(null, user.id_administrador);
}); 

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('Select * from administrador where id_administrador = ?', [id]);
    done(null, rows[0]);
});
