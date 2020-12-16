const usersCtrl = {};

const { response } = require("express");
const passport = require("passport");
const mongoose = require('mongoose');

const User = mongoose.model("usuario");

 
  
usersCtrl.logins = passport.authenticate("local", {
  successRedirect: "/my-account",
  failureRedirect: "/login-register",
  failureFlash: true,
});


usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/login-register");
};

// Controlador para Login de usuarios existentes
usersCtrl.login = (req, res) => {
  if (!req.body.email || !req.body.password) { // validar que todos los campos se hayan ingresado
      return res
          .status(400)
          .json({ "message": "All fields required" });
  }
  passport.authenticate('local', (err, user, info) => { // pasa el nombre de la estrategia y el callback para autenticar el método
      if (err) { // retorna error si passport encuentra un error
          return res
              .status(404)
              .json(err);
      }
      if (user) { // si passport encuentra al usuario, se genera y envía el token (JWT)
          //const token = user.generateJwt();
          res
              .status(200)
              .json({"mensaje": "Listpoo" });
      } else { // caso contrario se retorna el mensaje de porqué falló la authentication
          res
              .status(401)
              .json(info);
      }
  })(req, res); // request y response disponibles para passport
};


module.exports = usersCtrl;