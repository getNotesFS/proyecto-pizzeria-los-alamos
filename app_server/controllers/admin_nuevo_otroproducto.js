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
const adminNuevoOtroProductoView = (req, res) => {
  res.render("admin_nuevo_otroproducto", { title: "Listado OtrosProductos" });
};

//ADD NUEVO INGREDIENTE
const addNewOtroProducto = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  axios
    .post(`${apiOptions.server}/api/otrosproductos`, {
      Nombre: req.body.nombre,
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      Stock: req.body.stock,
      Cantidad: req.body.cantidad,
      Precio: parseFloat(req.body.precio),
    })
    .then(function (response) {
      console.log("Guardado");
      res.render("admin_nuevo_otroproducto", {
        title: "Add New Otro Producto",
        mensaje: "Se ha agrergado un nuevo otro producto " + req.body.nombre,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editOtroProductoView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/otrosproductos/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_otroproducto", {
        title: "Actualizar " + response.data.Nombre,
        _id: response.data._id,
        nombre: response.data.Nombre,
        tipo: response.data.Tipo,
        descripcion: response.data.Descripcion,
        stock: response.data.Stock,
        cantidad: response.data.Cantidad,
        precio: response.data.Precio,
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
const UpdateOtroProducto = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);
  axios
    .put(`${apiOptions.server}/api/otrosproductos/${req.params._id}`,{
      Nombre: req.body.nombre,
      Tipo: req.body.tipo,
      Descripcion: req.body.descripcion,
      Stock: req.body.stock,
      Cantidad: req.body.cantidad,
      Precio: req.body.precio
    })
    .then(function (){ 
      axios
        .get(`${apiOptions.server}/api/otrosproductos/${req.params._id}`)
        .then(function (response) {
          console.log(response.data);
          res.render("admin_editar_otroproducto", {
            title: "Actualizar " + response.data.Nombre,
            mensaje:response.data.Nombre+" se ha actualizado!",
            _id: response.data._id,
            nombre: response.data.Nombre,
            tipo: response.data.Tipo,
            stock: response.data.Stock,
            descripcion: response.data.Descripcion,
            cantidad: response.data.Cantidad,
            precio: response.data.Precio,
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
  adminNuevoOtroProductoView,
  addNewOtroProducto,
  editOtroProductoView,
  UpdateOtroProducto,
};
