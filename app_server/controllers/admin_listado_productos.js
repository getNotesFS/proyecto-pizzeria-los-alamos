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
  console.log("======DELETE Pizza");
  console.log("=========================>" + req.params._id);
  //delete Axios
  axios.delete(`${apiOptions.server}/api/pizzas/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-productos`);
    });
};


module.exports = {
  //separador de módulos con una "COMA"
  adminListadoProductos,
  deletePizza
};
