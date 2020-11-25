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

 

//listado Pizzas
  
const adminListadoUsuarios = (req, res) => {

  axios.get(`${apiOptions.server}/api/usuarios`)
    .then(function (response) {
    console.log(response.data);
      res.render("admin_listado_usuario", {
        title: "Listado Usuarios",
        usuariosList: response.data,
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
 

//delete
const deleteUsuario = (req, res) => {
  console.log("======DELETE Usuario");
  console.log("=========================>" + req.params._id);
  //delete Axios
  axios.delete(`${apiOptions.server}/api/usuarios/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-usuarios`);
    });
};


module.exports = {
  //separador de módulos con una "COMA"
  adminListadoUsuarios,
  deleteUsuario
};
