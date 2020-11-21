var express = require('express');
var router = express.Router();
var pool =  require('../config/database');
var site = require('../config/environments')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hola mundo");
  console.log(site.PUBLICSITE);
});

module.exports = router;
