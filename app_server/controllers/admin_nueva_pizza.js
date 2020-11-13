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

//GET INGREDIENTES
//PRINT VIEW NEW PIZZA
async function adminNuevaPizza(req,res) {
  try {
    const response = await axios.get(`${apiOptions.server}/api/ingredientes`);
    res.render("admin_nueva_pizza", { 
      title: "Nueva Pizza", 
      listaIngredientes: response.data
    });

  } catch (error) {
    console.error(error);
  }
}


//ADD PIZZA
const addNuevaPizza = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  axios.post(`${apiOptions.server}/api/pizzas`, {
      Nombre: req.body.nombre,
      Descripcion: req.body.descripcion,
      Categoria: req.body.categoria,
      TipoMasa: req.body.tipomasa,
      Tamanio: req.body.tamanio,
      Precio: parseFloat(req.body.precio),
      Imagen: req.body.imagen,
      Ingredientes: req.body.ingredientes,
    })
    .then(function (response) {  
      axios.get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) { 
          res.render("admin_nueva_pizza", {
            title: "Add New Pizza",
            mensaje: "Se ha agrergado un nuevo producto",
            listaIngredientes:response.data
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
      console.log(error);
    });
    
};


module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizza,
  addNuevaPizza
};
