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


  //MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const singleProduct = (req, res) => {
  axios .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
    .then(function (response) {
      console.log("===============SINGLE PRODUCT OBTENIDO===========================");
      console.log(response.data);
      const tmpp= response.data;
      axios.get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) { 
          res.render("single_product", {
            title: tmpp.Nombre,
            mensaje: "",
            listaIngredientes:response.data,
            pizzaData:tmpp
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

  /*
  const singleProduct = (req, res) => {
    res.render('single_product', { title: 'Producto' });
  }
  */
  const product = (req, res) => {
    res.render('single_product', { title: 'Producto' });
  }
  
    module.exports =  {
        //separador de módulos con una "COMA"
        product,
        singleProduct
  
    }