/*Controladores para la Collection Locations*/
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


const menu = (req, res) => {

  axios
  .get(`${apiOptions.server}/api/pizzas`)
  .then(function (response) { 
    //console.log(response.data);
    const tmpp = response.data;
    axios
      .get(`${apiOptions.server}/api/otrosproductos`)
      .then(function (response) {
        //console.log(response.data);
        res.render("menu", {
          title: "MENÚ",
          pizzaList: tmpp,
          listadoProductos: response.data, 
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
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

  const menus = (req, res) => {
    res.render('menu', { title: 'Menu' });
  }
  
    module.exports =  {
        //separador de módulos con una "COMA"
        menu
  
    }