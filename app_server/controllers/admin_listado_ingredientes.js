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

//Listado Ingredientes

//PRINT VIEW NEW PIZZA
const adminListadoIngredientes = (req, res) => {

  axios.get(`${apiOptions.server}/api/ingredientes`)
    .then(function (response) {
      res.render("admin_listado_ingredientes", {
        title: "Listado Ingredientes",
        ingredientesList: response.data,
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
 
//Get Ingrediente

const getIngrediente = (req, res) => {
  console.log("===========GET Ingrediente");
  console.log("===========" + req.params._id);
 
  axios.get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function (response) {
      console.log(response.data); 
        res.render("admin_listado_ingredientes", {
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

/*UPDATE Ingrediente*/

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

//delete
const deleteIngrediente = (req, res) => {
  console.log("======DELETE Ingrediente");
  console.log("=========================>" + req.params._id);
  //delete Axios
  axios.delete(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function () {
      console.log("DELETED");
      res.redirect(`/admin/listado-ingredientes`);
    });
};

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoIngredientes,
  deleteIngrediente,
  getIngrediente,
  UpdateIngrediente,
};
