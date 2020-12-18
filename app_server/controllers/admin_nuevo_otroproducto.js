/*Controladores */
//Llamado a request
const request = require("request");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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
  const tipo = "otrosproductos";

  // Validar que exista un archivo
  console.log(req.files);
  if (req.files != null && req.body.nombre != "" && req.body.precio != "") {
    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
      console.log("================ERROR TIPO ARCHIVO");
      // res.redirect("/admin/nuevo-ingrediente");
      res.render("admin_nuevo_otroproducto", {
        title: "Add New Otro Producto",
        mensaje: "Tipo de archivo inválido",
      });
    } else {
      // Generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
      console.log(nombreArchivo);
      // Path para guardar la imagen
      const paths = `./uploads/${tipo}/${nombreArchivo}`;
      // Mover la imagen
      file.mv(paths, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            ok: false,
            msg: "Error al mover la imagen",
          });
        }

        axios
          .post(`${apiOptions.server}/api/otrosproductos`, {
            Nombre: req.body.nombre,
            Tipo: req.body.tipo,
            Descripcion: req.body.descripcion,
            Stock: req.body.stock,
            Cantidad: req.body.cantidad,
            Precio: parseFloat(req.body.precio),
            Imagen: nombreArchivo,
          })
          .then(function (response) {
            console.log("Guardado");
            res.render("admin_nuevo_otroproducto", {
              title: "Add New Otro Producto",
              mensaje:
                "Se ha agrergado un nuevo otro producto " + req.body.nombre,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    res.render("admin_nuevo_otroproducto", {
      title: "Add New Otro Producto",
      mensaje: "Todos los campos deben estar llenos",
    });
  }

  ////////////
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
const editOtroProductoViewUpdated = (req, res, mensajeUp) => {
  axios
    .get(`${apiOptions.server}/api/otrosproductos/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_otroproducto", {
        title: "Actualizar " + response.data.Nombre,
        mensaje: mensajeUp,
        _id: response.data._id,
        nombre: response.data.Nombre,
        tipo: response.data.Tipo,
        descripcion: response.data.Descripcion,
        stock: response.data.Stock,
        cantidad: response.data.Cantidad,
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

//ACTUALIZAR INGREDIENTE
const UpdateOtroProducto = (req, res) => {
  const tipo = "otrosproductos";

  // Validar que exista un archivo
  console.log(req.files);
  if (
    req.files == null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.stock != "" &&
    req.body.cantidad != "" &&
    req.body.nombre != "" &&
    req.body.tipo != "" &&
    req.body.precio != ""
  ) {
    console.log("==========ACTUALIZAR");
    axios
      .put(`${apiOptions.server}/api/otrosproductos/${req.params._id}`, {
        Nombre: req.body.nombre,
        Tipo: req.body.tipo,
        Descripcion: req.body.descripcion,
        Stock: req.body.stock,
        Cantidad: req.body.cantidad,
        Precio: req.body.precio,
        Imagen: req.body.imagenh,
      })
      .then(function () {
        editOtroProductoViewUpdated(
          req,
          res,
          req.body.nombre + " se ha actualizado!"
        );
      });
  } else if (
    req.files != null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.stock != "" &&
    req.body.cantidad != "" &&
    req.body.nombre != "" &&
    req.body.tipo != "" &&
    req.body.precio != ""
  ) {
    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
      console.log("================ERROR TIPO ARCHIVO");
      editOtroProductoViewUpdated(req, res, "Tipo de archivo inválido");
    } else {
      // Generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
      //console.log(nombreArchivo);
      // Path para guardar la imagen
      const paths = `./uploads/${tipo}/${nombreArchivo}`;
      const pathActual = `./uploads/otrosproductos/${req.body.imagenh}`;
      if (fs.existsSync(pathActual)) {
        // borrar la imagen anterior
        fs.unlinkSync(pathActual);
      }
      // Mover la imagen
      file.mv(paths, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            ok: false,
            msg: "Error al mover la imagen",
          });
        }

        console.log("==========ACTUALIZAR");
        axios
          .put(`${apiOptions.server}/api/otrosproductos/${req.params._id}`, {
            Nombre: req.body.nombre,
            Tipo: req.body.tipo,
            Descripcion: req.body.descripcion,
            Stock: req.body.stock,
            Cantidad: req.body.cantidad,
            Precio: req.body.precio,
            Imagen: nombreArchivo,
          })
          .then(function () {
            editOtroProductoViewUpdated(
              req,
              res,
              req.body.nombre + " se ha actualizado!"
            );
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    editOtroProductoViewUpdated(
      req,
      res,
      "Todos los campos deben estar llenos"
    );
  }
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoOtroProductoView,
  addNewOtroProducto,
  editOtroProductoView,
  UpdateOtroProducto,
};
