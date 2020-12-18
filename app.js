require('dotenv').config(); 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); 
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");  
const flash = require("connect-flash");
const session = require("express-session");
const expressFileUpload = require('express-fileupload'); 

const fs = require('fs');
 

//MONGOSE BASE DE DATOS
require('./app_api/models/db');
//requiere consig/passport

//require('./app_api/config/passport');

//var usersRouter = require('./app_server/routes/users');
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');


const app = express();
// Passport Config
require('./app_api/config/passport');
//require("./app_api/config/passport");
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
app.use(express.static(path.join(__dirname, 'app-public')));

//passport init
 /*
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);*/
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
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

/* Email */
app.use(express.urlencoded({extended: false}));
app.use(express.json());



module.exports = app;
