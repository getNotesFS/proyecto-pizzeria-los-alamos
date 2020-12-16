const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("usuario");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ Correo: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          console.log("CONTRASEÑA CORRECTA");
          return done(null, user);
        } else {
          console.log("NO ENCONTRAMOS USUARIO CON ESA CONTRASEÑA");
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("SERIA", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser", id);
  //const User = new User();
/*
  User.findById(id, function (err, user) {
    done(err, user);
  });*/

  User.loadOne({ _id: id }).then(function(user) {
    done(null, user);
}).catch(function(err) {
    done(err, null);
});

});
