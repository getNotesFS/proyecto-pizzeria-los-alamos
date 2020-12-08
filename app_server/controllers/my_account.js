 
/*Controladores */
//Llamado a request
const request = require("request");
const mongoose = require('mongoose');
const User = mongoose.model("usuario"); 

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}
  
//VALIDATE USER

const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    console.log("correo es ====================", req.payload.email);
    User.findOne({ Correo : req.payload.email })
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({"message": "Usuario no encontrado, user no hay"});
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        }
        callback(req, res, user.Nombres);
      });
  } else {
    return res
      .status(404)
      .json({"message": "Usuario no encontrado, 404"});
  }
};




const myAccountView = (req, res) => {
 
    res.render('my_account', { title: 'Mi Cuenta' });
    //res.render('my_account', { title: 'Mi Cuenta' });

  }
  
  const myAccountPerfilView = (req, res) => {
    res.render('my_account_perfil', { title: 'Mi Cuenta - Perfil' });
  }
  
  const myAccountPedidosView = (req, res) => {
    res.render('my_account_pedidos', { title: 'Mi Cuenta - Pedidos' });
  }
  

  //FUNCIONES
  //MOSTRAR USUARIO EN FORMULARIO EDITAR
const editUsuarioView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/usuarios/${req.params._id}`)
    .then(function (response) {
      /*console.log(
        "========================TIPO USUARIO ES ==>>" +
          response.data.TipoUsuario
      );*/
      console.log(response.data);
      res.render("my_account_perfil", {
        title: "Actualizar " + response.data.Nombres,
        _id: response.data._id,
        nombre: response.data.Nombres,
        apellido: response.data.Apellidos,
        correo: response.data.Correo,
        contrasenia: response.data.Contrasenia,  
        cedula: response.data.Datos.Cedula,
        provincia: response.data.Datos.Provincia,
        ciudad: response.data.Datos.Ciudad,
        direccionFacturacion: response.data.Datos.DireccionFacturacion,
        direccionEnvio: response.data.Datos.DireccionEnvio,
        referencia: response.data.Datos.Referencia,
        telefonoConvencional: response.data.Datos.TelefonoConvencional,
        telefonoCelular: response.data.Datos.TelefonoCelular,
        codigoPostal: response.data.Datos.CodigoPostal
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
//ACTUALIZAR USUARIO
const UpdateUsuario = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);
  axios
    .put(`${apiOptions.server}/api/usuarios/${req.params._id}`, {
      
      Nombres: req.body.nombre,
      Apellidos: req.body.apellido,
      Correo: req.body.correo,
      Contrasenia: req.body.contrasenia,  
      Cedula: req.body.cedula,
      Provincia: req.body.provincia,
      Ciudad: req.body.ciudad,
      DireccionFacturacion: req.body.direccionFacturacion,
      DireccionEnvio: req.body.direccionEnvio,
      Referencia: req.body.referencia,
      TelefonoConvencional: req.body.telefonoConvencional,
      TelefonoCelular: req.body.telefonoCelular,
      CodigoPostal: req.body.codigoPostal
    })
    .then(function () {
      axios
        .get(`${apiOptions.server}/api/usuarios/${req.params._id}`)
        .then(function (response) {
          console.log("===================================DATOS ACTUALIZADOS==========");
          console.log(response.data);
          res.render("my_account_perfil", {
            title: "Actualizar " + response.data.Nombres,
            mensaje: "Los datos se han acutalizado correctamente!",
            _id: response.data._id,
            nombre: response.data.Nombres,
            apellido: response.data.Apellidos,
            correo: response.data.Correo,
            contrasenia: response.data.Contrasenia, 
            cedula: response.data.Datos.Cedula,
            provincia: response.data.Datos.Provincia,
            ciudad: response.data.Datos.Ciudad,
            direccionFacturacion: response.data.Datos.DireccionFacturacion,
            direccionEnvio: response.data.Datos.DireccionEnvio,
            referencia: response.data.Datos.Referencia,
            telefonoConvencional: response.data.Datos.TelefonoConvencional,
            telefonoCelular: response.data.Datos.TelefonoCelular,
            codigoPostal: response.data.Datos.CodigoPostal,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    });
 
};

    module.exports =  {
        //separador de módulos con una "COMA"
        myAccountView,
        myAccountPerfilView,
        myAccountPedidosView,
        editUsuarioView,
        UpdateUsuario
  
    }