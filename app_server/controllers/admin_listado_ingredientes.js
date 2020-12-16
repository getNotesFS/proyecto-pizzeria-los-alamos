/*Controladores */
//Llamado a request
const { get } = require("request");
const request = require("request");

const formidable = require("formidable");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const {
  tipoArchivo,
  subirArchivo,
} = require("../../helpers/actualizar-imagen");

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
 
  
//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
 

//delete
const deleteIngrediente = (req, res) => {
  
  axios
    .get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function (response) {
      const pathActual = `./uploads/ingredientes/${response.data.Imagen}`;
      if ( fs.existsSync( pathActual ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( pathActual );
      }
      //delete Axios
      axios.delete(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
      .then(function () {
        console.log("DELETED");
        res.redirect(`/admin/listado-ingredientes`);
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

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoIngredientes,
  deleteIngrediente, 
};
