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
async function adminNuevaPizzaView(req,res) {
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



//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editPizzaView = (req, res) => {
  axios .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
    .then(function (response) {
      console.log("==========================================");
      console.log(response.data);
      const tmpp= response.data;
      axios.get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) { 
          res.render("admin_editar_pizza", {
            title: "Actualizar",
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

 
 
//UPDATE PIZZA
 
const updatePizza = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);
  axios
    .put(`${apiOptions.server}/api/pizzas/${req.params._id}`,{
      Nombre: req.body.nombre,
      Descripcion: req.body.descripcion,
      Categoria: req.body.categoria,
      TipoMasa: req.body.tipomasa,
      Tamanio: req.body.tamanio,
      Precio: parseFloat(req.body.precio),
      Imagen: req.body.imagen,
      Ingredientes: req.body.ingredientes
    })
    .then(function (){ 
      axios .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
      .then(function (response) {
        console.log("==========================================");
        console.log(response.data);
        const tmpp= response.data;
        axios.get(`${apiOptions.server}/api/ingredientes`)
          .then(function (response) { 
            res.render("admin_editar_pizza", {
              title: "Actualizar",
              mensaje: "Se ha actualizado",
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
    })
 
};


module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizzaView,
  addNuevaPizza, 
  updatePizza,
  editPizzaView
};
