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

//Listado Ofertas

//PRINT VIEW NEW PIZZA
const adminListadoOferta = (req, res) => {

  axios.get(`${apiOptions.server}/api/ofertas`)
    .then(function (response) {
      res.render("admin_listado_oferta", {
        title: "Listado Ofertas",
        ofertasList: response.data,
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
const deleteOferta = (req, res) => {
  
  //delete Axios
  axios.delete(`${apiOptions.server}/api/ofertas/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-oferta`);
    });
};

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoOferta,
  deleteOferta, 
};