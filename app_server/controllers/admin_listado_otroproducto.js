/*Controladores */
//Llamado a request
const { get } = require("request");
const request = require("request");
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

//Listado Ingredientes

//PRINT VIEW NEW PIZZA
const adminListadoOtroProductos = (req, res) => {

  axios.get(`${apiOptions.server}/api/otrosproductos`)
    .then(function (response) {
      res.render("admin_listado_otroproducto", {
        title: "Listado OtrosProductos",
        otroProductoList: response.data,
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
const deleteOtrosProductos = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/otrosproductos/${req.params._id}`)
    .then(function (response) {
      const pathActual = `./uploads/otrosproductos/${response.data.Imagen}`;
      if ( fs.existsSync( pathActual ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( pathActual );
      }
      //delete Axios
      axios.delete(`${apiOptions.server}/api/otrosproductos/${req.params._id}`)
      .then(function () {
        console.log("DELETED");
        res.redirect(`/admin/listado-otroproducto`);
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
  adminListadoOtroProductos,
  deleteOtrosProductos, 
};
