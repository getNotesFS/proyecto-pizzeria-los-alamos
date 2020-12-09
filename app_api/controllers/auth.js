const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model("usuario");

const register = (req, res) => {
    if (!req.body.Nombres || !req.body.Apellidos || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({"message": "Todos los campos requeridos -> [Datos recibidos]"});
    }
  
    const user = new User();
    user.TipoUsuario = req.body.TipoUsuario;
    user.Nombres = req.body.Nombres;
    user.Apellidos = req.body.Apellidos;
    user.Correo = req.body.email;
    user.setPassword(req.body.password); 
    user.Datos = {
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

    user.save((err) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const token = user.generateJwt();
        res
          .status(200)
          .json({token});
      }
    })
  };
  
  const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({"message": "Todos los campos requeridos -> [Login]"});
    }
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res
          .status(404)
          .json(err);
      }
      if (user) {
        const token = user.generateJwt();
        res
          .status(200)
          .json({token});
      } else {
        res
          .status(401)
          .json(info);
      }
    })(req, res);
  };
  
  module.exports = {
    register,
    login
  };
  