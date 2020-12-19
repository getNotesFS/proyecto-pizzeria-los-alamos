/*Controladores */
//Llamado a request
const request = require("request");
//const formidable = require("formidable");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const {
  tipoArchivo,
  subirArchivo,
} = require("../../helpers/actualizar-imagen");

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}
//print LISTADO
const adminNuevoIngredienteView = (req, res) => {
  res.render("admin_nuevo_ingrediente", { title: "Listado Productos" });
};

//ADD NUEVO INGREDIENTE
const addNewIngrediente = (req, res) => {
  const tipo = "ingredientes";

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
      res.render("admin_nuevo_ingrediente", {
        title: "Nuevo Ingrediente",
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
          .post(`${apiOptions.server}/api/ingredientes`, {
            Nombre: req.body.nombre,
            Imagen: nombreArchivo,
            Precio: parseFloat(req.body.precio),
          })
          .then(function (response) {
            console.log("Guardado");
            res.render("admin_nuevo_ingrediente", {
              title: "Add New Ingrediente",
              mensaje:
                "Se ha agrergado un nuevo ingrediente " + req.body.nombre,
            });
          })
          .catch(function (error) {
            // console.log(error);
            console.log("algun error");
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    res.render("admin_nuevo_ingrediente", {
      title: "Nuevo Ingrediente",
      mensaje: "Todos los campos deben estar llenos",
    });
  }
};

//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editIngredienteView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_ingrediente", {
        title: "Actualizar " + response.data.Nombre,
        mensaje: "",
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
const editIngredienteViewUpdated = (req, res, mensajeUpd) => {
  axios
    .get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_ingrediente", {
        title: "Actualizar " + response.data.Nombre,
        mensaje: mensajeUpd,
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

//ACTUALIZAR INGREDIENTE
const UpdateIngrediente = (req, res) => {
  const tipo = "ingredientes";

  // Validar que exista un archivo
  console.log(req.files);
  if (
    req.files == null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
    req.body.precio != ""
  ) {
    console.log("==========ACTUALIZAR");
    axios
      .put(`${apiOptions.server}/api/ingredientes/${req.params._id}`, {
        Nombre: req.body.nombre,
        Precio: req.body.precio,
        Imagen: req.body.imagenh,
      })
      .then(function () {
        editIngredienteViewUpdated(
          req,
          res,
          req.body.nombre + " se ha actualizado!"
        );
      });
  } else if (
    req.files != null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
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
      editIngredienteViewUpdated(req, res, "Tipo de archivo inválido");
    } else {
      // Generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
      console.log(nombreArchivo);
      // Path para guardar la imagen
      const paths = `./uploads/${tipo}/${nombreArchivo}`;
      const pathActual = `./uploads/ingredientes/${req.body.imagenh}`;
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
          .put(`${apiOptions.server}/api/ingredientes/${req.params._id}`, {
            Nombre: req.body.nombre,
            Precio: req.body.precio,
            Imagen: nombreArchivo,
          })
          .then(function () {
            editIngredienteViewUpdated(
              req,
              res,
              req.body.nombre + " se ha actualizado!"
            );
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    editIngredienteViewUpdated(req, res, "Todos los campos deben estar llenos");
  }
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoIngredienteView,
  addNewIngrediente,
  editIngredienteView,
  UpdateIngrediente,
};
