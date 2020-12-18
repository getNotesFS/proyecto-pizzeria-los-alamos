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
const adminNuevoOfertaView = (req, res) => {
  res.render("admin_nuevo_oferta", { title: "Listado Ofertas" });
};

//ADD NUEVO INGREDIENTE
const addNewOferta = (req, res) => {
  const tipo = "ofertas";

  if (
    req.files != null &&
    req.body.nombre != "" &&
    req.body.descripcion != ""
  ) {
    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
      console.log("================ERROR TIPO ARCHIVO");
      // res.redirect("/admin/nuevo-ingrediente");
      res.render("admin_nuevo_oferta", {
        title: "Nueva Oferta",
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
          .post(`${apiOptions.server}/api/ofertas`, {
            Imagen: nombreArchivo,
            Descripcion: req.body.descripcion,
            Nombre: req.body.nombre,
          })
          .then(function (response) {
            console.log("Guardado");
            res.render("admin_nuevo_oferta", {
              title: "admin_nuevo_oferta",
              mensaje: "Se ha agrergado un nuevo oferta " + req.body.nombre,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    res.render("admin_nuevo_oferta", {
      title: "Nueva Oferta",
      mensaje: "Todos los campos deben estar llenos",
    });
  }

  //////////
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
const editOfertaViewUpdated = (req, res, mensajeUpd) => {
  axios
    .get(`${apiOptions.server}/api/ofertas/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_oferta", {
        title: "Actualizar " + response.data.Nombre,
        mensaje: mensajeUpd,
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
  const tipo = "ofertas";

  // Validar que exista un archivo
  console.log(req.files);
  if (
    req.files == null &&
    req.body.descripcion != "" &&
    req.body.imagenh != "" &&
    req.body.nombre != ""
  ) {
    console.log("==========ACTUALIZAR");
    axios
      .put(`${apiOptions.server}/api/ofertas/${req.params._id}`, {
        Imagen: req.body.imagenh,
        Descripcion: req.body.descripcion,
        Nombre: req.body.nombre,
      })
      .then(function () {
        editOfertaViewUpdated(
          req,
          res,
          req.body.nombre + " se ha actualizado!"
        );
      });
  } else if (
    req.files != null &&
    req.body.descripcion != "" &&
    req.body.imagenh != "" &&
    req.body.nombre != ""
  ) {
    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
      console.log("================ERROR TIPO ARCHIVO");
      editOfertaViewUpdated(req, res, "Tipo de archivo inválido");
    } else {
      // Generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
      console.log(nombreArchivo);
      // Path para guardar la imagen
      const paths = `./uploads/${tipo}/${nombreArchivo}`;
      const pathActual = `./uploads/ofertas/${req.body.imagenh}`;
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
          .put(`${apiOptions.server}/api/ofertas/${req.params._id}`, {
            Imagen: nombreArchivo,
            Descripcion: req.body.descripcion,
            Nombre: req.body.nombre,
          })
          .then(function () {
            editOfertaViewUpdated(
              req,
              res,
              req.body.nombre + " se ha actualizado!"
            );
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    editOfertaViewUpdated(req, res, "Todos los campos deben estar llenos");
  }
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoOfertaView,
  addNewOferta,
  editOfertaView,
  UpdateOferta,
};
