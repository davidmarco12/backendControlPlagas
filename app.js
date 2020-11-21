var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();
var flash = require('connect-flash');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
const { DB } = require('./config/environments');
require('./lib/passport');

//Auth Packages
var session = require('express-session');
var passport = require('passport');

//var Router
var indexRouter = require('./routes/index');
var pdfRouter = require('./routes/pdf');
var clientesRouter = require('./routes/clientes');
var sucursalesRouter = require('./routes/sucursales');
var planosRouter = require('./routes/planos');
var serviciosRouter = require('./routes/servicios');
var tecnicosRouter = require('./routes/tecnicos');
var visitasRouter = require('./routes/visitas');
var authRouter = require('./components/administrador/administradorController');
var formularioRouter = require('./routes/formularios');
var emailRouter = require('./routes/email');
var productoRouter = require('./routes/productos');

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(flash());
app.use(session({
  secret: 'CPAmbiental',
  resave: false,
  saveUninitialized: false,
  store : new MySQLStore(DB)
  //cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());



//Routes
app.use('/', indexRouter);
app.use('/pdf', pdfRouter);
app.use('/clientes', clientesRouter);
app.use('/sucursales', sucursalesRouter);
app.use('/planos', planosRouter);
app.use('/servicios',serviciosRouter);
app.use('/tecnicos', tecnicosRouter);
app.use('/visitas', visitasRouter);
app.use('/auth', authRouter);
app.use('/formularios', formularioRouter);
app.use('/email', emailRouter);
app.use('/productos', productoRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
