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
//getUserData = async () =>


async function adminNuevaPizza(req,res) {
  try {
    const response = await axios.get(`${apiOptions.server}/api/ingredientes`);
    //console.log(response.data);
  
    res.render("admin_nueva_pizza", { 
      title: "Nueva Pizza", 
      listaIngredientes: response.data
    });

  } catch (error) {
    console.error(error);
  }
}
/*
const adminNuevaPizza = (req, res) => {

  


  axios.get(`${apiOptions.server}/api/ingredientes`)
    .then(function (response) {
      // handle success
     // console.log(response);
      res.render("admin_nueva_pizza", { 
        title: "Nueva Pizza", 
        listaIngredientes: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  /* const path = `/api/ingredientes`;
  const requestOptions = {
    //Objeto cargado con las Opciones
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
    qs: {},
  };
  request(
    requestOptions, // Opciones
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200 && body) {
        console.log("Listado ingredientes recuperado");
        console.log(body);
        res.render("admin_nueva_pizza", { 
          title: "Nueva Pizza", 
          listaIngredientes: body
        });
      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
        console.log(err);
      }
    }
  );
 */
//};

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
      console.log("Ha recibido");
      //res.redirect(`/admin/nueva-pizza`);
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

/*
  const path = "/api/pizzas";
  const postdata = {
    Nombre: req.body.nombre,
    Descripcion: req.body.descripcion,
    Categoria: req.body.categoria,
    TipoMasa: req.body.tipomasa,
    Tamanio: req.body.tamanio,
    Precio: parseFloat(req.body.precio),
    Imagen: req.body.imagen,
    Ingredientes: req.body.ingredientes,
  };


  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "POST",
    json: postdata,
  };

  
  request(requestOptions, (err, { statusCode }, { name }, body) => {
    console.log("Aqui voy");
    if (statusCode === 201) {
      
      console.log("Ha recibido");
      res.render("admin_nueva_pizza", {
        title: "Add New Pizza",
        mensaje: "Se ha agrergado un nuevo producto",
      });
    } else if (statusCode === 400 && name && name === "ValidationError") {
      res.redirect("/admin/nueva-pizza?err=val");
   
      console.log(body);
    } else {
      showError(req, res, statusCode);
      console.log(err);
    }
  });
  

  
};*/

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizza,
  addNuevaPizza
};
