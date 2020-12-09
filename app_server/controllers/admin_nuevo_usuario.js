/*Controladores */
//Llamado a request
const request = require("request");

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}
//print LISTADO
const adminNuevoUsuarioView = (req, res) => {
  res.render("admin_nuevo_usuario", { title: "Nuevio Usuario" });
};

//ADD NUEVO USUARIO
const addNewUsuario = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  axios
    .post(`${apiOptions.server}/api/register`, {
      
      Nombres: req.body.nombre,
      Apellidos: req.body.apellido,
      Correo: req.body.correo,
      Contrasenia: req.body.contrasenia,
      TipoUsuario: req.body.tipousuario,
      Cedula: req.body.cedula,
      Provincia: req.body.provincia,
      Ciudad: req.body.ciudad,
      DireccionFacturacion: req.body.direccionFacturacion,
      DireccionEnvio: req.body.direccionEnvio,
      Referencia: req.body.referencia,
      TelefonoConvencional: req.body.telefonoConvencional,
      TelefonoCelular: req.body.telefonoCelular,
      CodigoPostal: req.body.codigoPostal,
    })
    .then(function (response) {
      console.log("Guardado");
      res.render("admin_nuevo_usuario", {
        title: "Add New Usuario",
        mensaje: "Se ha agrergado un nuevo usuario " + req.body.nombre,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//MOSTRAR USUARIO EN FORMULARIO EDITAR
const editUsuarioView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/usuarios/${req.params._id}`)
    .then(function (response) {
      console.log(
        "========================TIPO USUARIO ES ==>>" +
          response.data.TipoUsuario
      );
      res.render("admin_editar_usuario", {
        title: "Actualizar " + response.data.Nombres,
        _id: response.data._id,
        nombre: response.data.Nombres,
        apellido: response.data.Apellidos,
        correo: response.data.Correo,
        contrasenia: response.data.Contrasenia, 
        tipousuario: response.data.TipoUsuario,
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
    .put(`${apiOptions.server}/api/update/${req.params._id}`, {
      
      Nombres: req.body.nombre,
      Apellidos: req.body.apellido,
      Correo: req.body.correo,
      Contrasenia: req.body.contrasenia, 
      TipoUsuario: req.body.tipousuario,
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
          res.render("admin_editar_usuario", {
            title: "Actualizar " + response.data.Nombres,
            mensaje: response.data.Nombres + " se ha actualizado!",
            _id: response.data._id,
            nombre: response.data.Nombres,
            apellido: response.data.Apellidos,
            correo: response.data.Correo,
            contrasenia: response.data.Contrasenia,
            tipousuario: response.data.TipoUsuario,
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

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoUsuarioView,
  addNewUsuario,
  editUsuarioView,
  UpdateUsuario,
};
