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


const homepage = (req, res) => {

 
  axios.get(`${apiOptions.server}/api/pizzas`)
    .then(function (response) {
      
      res.render("index", {
        title: "Inicio",
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

/*GET -> Mi Homepage*/
const homepages = (req, res) => {
  res.render('index', { 

    title: 'Inicio' 

});

}

 

  module.exports =  {
      //separador de módulos con una "COMA"
      homepage

  }