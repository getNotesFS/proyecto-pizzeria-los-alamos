/*Controladores */
//Llamado a request
const { get } = require("request");
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

//Listado Ingredientes

//PRINT VIEW NEW PIZZA
const adminListadoIngredientes = (req, res) => {

  axios.get(`${apiOptions.server}/api/ingredientes`)
    .then(function (response) {
      res.render("admin_listado_ingredientes", {
        title: "Listado Ingredientes",
        ingredientesList: response.data,
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
const deleteIngrediente = (req, res) => {
  console.log("======DELETE Ingrediente");
  console.log("=========================>" + req.params._id);
  //delete Axios
  axios.delete(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-ingredientes`);
    });
};

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoIngredientes,
  deleteIngrediente, 
};
