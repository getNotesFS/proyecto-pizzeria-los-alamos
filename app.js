require('dotenv').config(); 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 
const cors = require('cors');
const flash = require("connect-flash");
const expressFileUpload = require('express-fileupload');
const session = require("express-session");
  
const passport = require("passport"); 
const bodyParser = require('body-parser');
const fs = require('fs');
 

//MONGOSE BASE DE DATOS
require('./app_api/models/db');
//requiere consig/passport

//require('./app_api/config/passport');

//var usersRouter = require('./app_server/routes/users');
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');


const app = express();
require("./app_api/config/passport");
//require("./app_server/controllers/auth");
// Lectura y parseo del body 
// default options 
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
 
//app.use( expressFileUpload() );
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 

// view engine setup  -> al modificar la ruta de las carpetas se debe especificar la carpeta padre
app.set('views', path.join(__dirname,'app_server', 'views'));

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
//app.use(express.static(__dirname + '/uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));  
app.use(express.static(path.join(__dirname, 'public'))); 
//app angular aqui
app.use(express.static(path.join(__dirname, 'app_public')));
//passport init
 /*
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);*/
    const MemoryStore =session.MemoryStore;
    app.use(session({
        name : 'app.sid',
        secret: "secret",
        resave: true,
        store: new MemoryStore(),
        saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

  // initialize express-session
  /*
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
*/
 

//permitir los requerimientos Angular
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

 //api Router
app.use('/', indexRouter);
app.use('/api',apiRouter);
//app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
})

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
