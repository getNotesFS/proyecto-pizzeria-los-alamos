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
//print LISTADO
const adminNuevoOfertaView = (req, res) => {
  res.render("admin_nuevo_oferta", { title: "Listado Ofertas" });
};

//ADD NUEVO INGREDIENTE
const addNewOferta = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  axios
    .post(`${apiOptions.server}/api/ofertas`, {
      Imagen: req.body.imagen,  
      Descripcion: req.body.descripcion,
      Nombre: req.body.nombre,
     
    })
    .then(function (response) {
      console.log("Guardado");
      res.render("admin_nuevo_oferta", {
        title: "Add New Oferta",
        mensaje: "Se ha agrergado un nuevo oferta " + req.body.nombre,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editOfertaView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/ofertas/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_oferta", {
        title: "Actualizar " + response.data.Nombre,
        _id: response.data._id,
        imagen: response.data.Imagen,
        descripcion: response.data.Descripcion,
        nombre: response.data.Nombre,
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
//ACTUALIZAR INGREDIENTE
const UpdateOferta = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);
  axios
    .put(`${apiOptions.server}/api/ofertas/${req.params._id}`,{
      Imagen: req.body.imagen,
      Descripcion: req.body.descripcion,
      Nombre: req.body.nombre
    })
    .then(function (){ 
      axios
        .get(`${apiOptions.server}/api/ofertas/${req.params._id}`)
        .then(function (response) {
          console.log(response.data);
          res.render("admin_editar_oferta", {
            title: "Actualizar " + response.data.Nombre,
            mensaje:response.data.Nombre+" se ha actualizado!",
            _id: response.data._id,
            imagen: response.data.Imagen,
            descripcion: response.data.Descripcion,
            nombre: response.data.Nombre,
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
  adminNuevoOfertaView,
  addNewOferta,
  editOfertaView,
  UpdateOferta,
};