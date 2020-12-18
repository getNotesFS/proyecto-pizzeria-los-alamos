/*Controladores */
//Llamado a request
const { get } = require("request");
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

//GET INGREDIENTES
//PRINT VIEW NEW PIZZA
async function adminNuevaPizzaView(req, res) {
  try {
    const response = await axios.get(`${apiOptions.server}/api/ingredientes`);
    res.render("admin_nueva_pizza", {
      title: "Nueva Pizza",
      listaIngredientes: response.data,
    });
  } catch (error) {
    console.error(error);
  }
}

//ADD PIZZA
const addNuevaPizza = (req, res) => {
  const tipo = "pizzas";

  // Validar que exista un archivo
  console.log(req.files);
  if (
    req.files != null &&
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.categoria != "" &&
    req.body.tipomasa != "" &&
    req.body.tamanio != "" &&
    req.body.precio != "" &&
    req.body.ingredientes != ""
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
      axios
        .get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) {
          res.render("admin_nueva_pizza", {
            title: "Add New Pizza",
            mensaje: "Tipo de archivo inválido",
            listaIngredientes: response.data,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
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
          .post(`${apiOptions.server}/api/pizzas`, {
            Nombre: req.body.nombre,
            Descripcion: req.body.descripcion,
            Categoria: req.body.categoria,
            TipoMasa: req.body.tipomasa,
            Tamanio: req.body.tamanio,
            Precio: parseFloat(req.body.precio),
            Imagen: nombreArchivo,
            Ingredientes: req.body.ingredientes,
          })
          .then(function (response) {
            axios
              .get(`${apiOptions.server}/api/ingredientes`)
              .then(function (response) {
                res.render("admin_nueva_pizza", {
                  title: "Add New Pizza",
                  mensaje:
                    "Se ha agrergado un nuevo producto" + req.body.nombre,
                  listaIngredientes: response.data,
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
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    axios
      .get(`${apiOptions.server}/api/ingredientes`)
      .then(function (response) {
        res.render("admin_nueva_pizza", {
          title: "Add New Pizza",
          mensaje: "Todos los campos deben estar llenos",
          listaIngredientes: response.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
};

//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editPizzaView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
    .then(function (response) {
      console.log("==========================================");
      console.log(response.data);
      const tmpp = response.data;
      axios
        .get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) {
          res.render("admin_editar_pizza", {
            title: "Actualizar",
            mensaje: "",
            listaIngredientes: response.data,
            pizzaData: tmpp,
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

const editPizzaViewUpdated = (req, res, mensajeUpd) => {
  axios
    .get(`${apiOptions.server}/api/pizzas/${req.params._id}`)
    .then(function (response) {
      console.log("==========================================");
      console.log(response.data);
      const tmpp = response.data;
      axios
        .get(`${apiOptions.server}/api/ingredientes`)
        .then(function (response) {
          res.render("admin_editar_pizza", {
            title: "Actualizar",
            mensaje: mensajeUpd,
            listaIngredientes: response.data,
            pizzaData: tmpp,
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
  const tipo = "pizzas";

  // Validar que exista un archivo
  console.log(req.files);
  if (
    req.files == null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.categoria != "" &&
    req.body.tipomasa != "" &&
    req.body.tamanio != "" &&
    req.body.precio != "" &&
    req.body.ingredientes != ""
  ) {
    axios
      .put(`${apiOptions.server}/api/pizzas/${req.params._id}`, {
        Nombre: req.body.nombre,
        Descripcion: req.body.descripcion,
        Categoria: req.body.categoria,
        TipoMasa: req.body.tipomasa,
        Tamanio: req.body.tamanio,
        Precio: parseFloat(req.body.precio),
        Imagen: req.body.imagenh,
        Ingredientes: req.body.ingredientes,
      })
      .then(function () {
        editPizzaViewUpdated(req, res, req.body.nombre + " se ha actualizado!");
      });
  } else if (
    req.files != null &&
    req.body.imagenh != "" &&
    req.body.nombre != "" &&
    req.body.descripcion != "" &&
    req.body.categoria != "" &&
    req.body.tipomasa != "" &&
    req.body.tamanio != "" &&
    req.body.precio != "" &&
    req.body.ingredientes != ""
  ) {
    // Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split("."); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
      console.log("================ERROR TIPO ARCHIVO");
      editPizzaViewUpdated(req, res, "Tipo de archivo inválido");
    } else {
      // Generar el nombre del archivo
      const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
      console.log(nombreArchivo);
      // Path para guardar la imagen
      const paths = `./uploads/${tipo}/${nombreArchivo}`;

      const pathActual = `./uploads/pizzas/${req.body.imagenh}`;
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
        //console.log(fields);
        console.log("==========ACTUALIZAR");
        axios
          .put(`${apiOptions.server}/api/pizzas/${req.params._id}`, {
            Nombre: req.body.nombre,
            Descripcion: req.body.descripcion,
            Categoria: req.body.categoria,
            TipoMasa: req.body.tipomasa,
            Tamanio: req.body.tamanio,
            Precio: parseFloat(req.body.precio),
            Imagen: nombreArchivo,
            Ingredientes: req.body.ingredientes,
          })
          .then(function () {
            editPizzaViewUpdated(
              req,
              res,
              req.body.nombre + " se ha actualizado!"
            );
          });
      });
    }
  } else {
    console.log("================ERROR NO ARCHIVO");
    //res.redirect("/admin/nuevo-ingrediente");
    editPizzaViewUpdated(req, res, "Todos los campos deben estar llenos");
  }

  
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizzaView,
  addNuevaPizza,
  updatePizza,
  editPizzaView,
};
