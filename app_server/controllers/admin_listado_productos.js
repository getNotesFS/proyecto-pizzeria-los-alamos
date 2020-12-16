/*Controladores */
//Llamado a request
const request = require("request");

const formidable = require("formidable");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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
  
const adminListadoProductos = (req, res) => {

  axios.get(`${apiOptions.server}/api/pizzas`)
    .then(function (response) {
      res.render("admin_listado_productos", {
        title: "Listado Pizzas",
        pizzaList: response.data,
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
const deletePizza = (req, res) => {
  axios
  .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
  .then(function (response) {
    const pathActual = `./uploads/pizzas/${response.data.Imagen}`;
    if ( fs.existsSync( pathActual ) ) {
      // borrar la imagen anterior
      fs.unlinkSync( pathActual );
    }
    //delete Axios
   //delete Axios
  axios.delete(`${apiOptions.server}/api/pizzas/${req.params._id}`)
  .then(function () {
    console.log("DELETED");
    res.redirect(`/admin/listado-productos`);
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
  adminListadoProductos,
  deletePizza
};
