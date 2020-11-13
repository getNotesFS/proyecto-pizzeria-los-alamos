 
/*Controladores */
//Llamado a request
const request = require("request");
 

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pro-web-pizza-la.herokuapp.com'; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}


const adminNuevoIngredienteView = (req, res) => {
  res.render("admin_nuevo_ingrediente", { title: "Listado Productos" });
};

const addNewIngrediente = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  axios.post(`${apiOptions.server}/api/ingredientes`, {
    Nombre: req.body.nombre,
    Imagen: req.body.imagen,
    Precio: parseFloat(req.body.precio)
  })
  .then(function (response) {  
    console.log("Guardado");
    res.render("admin_nuevo_ingrediente", {
      title: "Add New Ingrediente",
      mensaje: "Se ha agrergado un nuevo ingrediente " +req.body.nombre
    });
      
  })
  .catch(function (error) {
    console.log(error);
  });
  
 
};

const editIngredienteView = (req, res) => {
    axios.get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
      .then(function (response) {
        console.log(response.data); 
          res.render("admin_editar_ingrediente", {
            title: "Actualizar " + response.data.Nombre,
            _id: response.data._id,
            nombre: response.data.Nombre,
            precio: response.data.Precio,
            imagen: response.data.Imagen,
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

const UpdateIngrediente = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);

  const path = "/api/ingredientes";

  const putdata = {
    nombre: req.body.Nombre,
    precio: req.body.Precio,
    imagen: req.body.Imagen,
  };

  const requestOptions = {
    url: `${apiOptions.server}${path}/${req.params.codigo}`,
    method: "PUT",
    json: putdata,
  };

  request(requestOptions, (err, { statusCode }, { name }, body) => {
    if (statusCode === 200) {
      console.log("Ha actualizado");
      res.redirect("/admin/listado-ingredientes");
    } else if (statusCode === 400 && name && name === "ValidationError") {
      res.redirect("/admin/listado-ingredientes?err=val");
      console.log(body);
    } else {
      // showError(req, res, statusCode);
      console.log(err);
    }
  });
};
 

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoIngredienteView,
  addNewIngrediente,
  editIngredienteView,
  UpdateIngrediente
};
