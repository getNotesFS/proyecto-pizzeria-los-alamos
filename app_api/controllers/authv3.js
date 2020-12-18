const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const mongoose = require("mongoose");
const User = mongoose.model("usuario"); 

const { response } = require('express');

const login = async( req, res = response,next ) => {

    passport.authenticate('local', {
        successRedirect: '/my-account',
        failureRedirect: '/login-register',
        failureFlash: true
      })(req, res, next);


}
const logout = async(req, res = response) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login-register');
}

const register = async(req, res = response) =>{
    const { Coreo, Contrasenia } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ Correo: Coreo });

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(); 
        usuario.TipoUsuario = req.body.TipoUsuario;
        usuario.Nombres = req.body.Nombres;
        usuario.Apellidos = req.body.Apellidos;
        usuario.Correo = req.body.Correo; 
        usuario.Datos = {
            Cedula: req.body.Cedula,
            Provincia: req.body.Provincia,
            Ciudad: req.body.Ciudad,
            DireccionFacturacion: req.body.DireccionFacturacion,
            DireccionEnvio: req.body.DireccionEnvio,
            Referencia: req.body.Referencia,
            TelefonoConvencional: req.body.TelefonoConvencional,
            TelefonoCelular: req.body.TelefonoCelular,
            CodigoPostal: req.body.CodigoPostal,
        };
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.Contrasenia = bcrypt.hashSync( req.body.Contrasenia, salt );
    
    
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
}

module.exports = {login, logout};

// Login Page
//router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
//router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));



// Register
/*
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
*/
//module.exports = router;
