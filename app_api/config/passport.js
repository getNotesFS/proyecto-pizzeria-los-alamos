const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model("usuario");

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ Correo: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, {
          message: 'Usuario incorrecto.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Contraseña incorrecta.'
        });
      }
      return done(null, user);
    });
  }
));