/*
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.send('registrate');
});




router.post('/signup', (req, res) => {
  //req.check('username', 'Username is Required').notEmpty();
  //req.check('password', 'Password is Required').notEmpty();
  //const errors = req.validationErrors();
  //if (errors.length > 0) {
  //  req.flash('message', errors[0].msg);
  //  res.redirect('/signin');
  //}
  passport.authenticate('local.signup', function(err,user){
    if(user){ return res.json({
      status : 'OK',
      result : 'Registro exitoso'
    })}
    else{
      return res.json({
        status : 'Error',
        message : 'ERROR'
      });
    }
  })(req, res);
});




// SINGIN
router.get('/signin', isLoggedIn, (req, res) => {
  res.send('vienvenido');
});

router.post('/signin', (req, res) => {
  //req.check('username', 'Username is Required').notEmpty();
  //req.check('password', 'Password is Required').notEmpty();
  //const errors = req.validationErrors();
  passport.authenticate('local.signin', function(err,user,info){
    if (!user) { return res.json({
      status : 'ERROR',
      message : info
    }); }
    if(user){ return res.json({
      status : 'OK',
      result : 'BIENVENIDO USUARIO'
    })}
    else{
      return info
    }
  })(req, res);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('http://appbackendcpa.herokuapp.com');
});

router.get('/profile',isLoggedIn, (req, res) => {
  res.send('this is my profile');
});

module.exports = router;

*/