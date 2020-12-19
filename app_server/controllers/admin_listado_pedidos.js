/*Controladores */
//Llamado a request
const { get } = require("request");
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

//Listado Ingredientes

//PRINT VIEW NEW PIZZA
const adminListadoPedidos = (req, res) => {

  axios.get(`${apiOptions.server}/api/pedidos`)
    .then(function (response) {
      res.render("admin_listado_pedidos", {
        title: "Listado Pedidos",
        pedidosList: response.data,
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
const deletePedido = (req, res) => {
  
    //delete Axios
    axios.delete(`${apiOptions.server}/api/pedidos/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-pedidos`);
    });
 

  
};

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoPedidos,
  deletePedido, 
};
