/*Controladores */
//Llamado a request
const { get } = require("request");
const request = require("request"); 
const formidable = require("formidable");
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
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(files);

    if (files.imagen.name != "" && fields.nombre != "" && fields.descripcion != ''&& fields.categoria != ''&& fields.tipomasa != ''&& fields.tamanio != '' && fields.precio != ''&& fields.ingredientes != '') {
      if (tipoArchivo(files.imagen.name)) {
        const oldpath = files.imagen.path;
        const newpath = "./uploads/";

        const nombreCortado = files.imagen.name.split("."); // wolverine.1.3.jpg
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //Path para guardar la imagen
        const newp = newpath + tipo + "/" + nombreArchivo;

        fs.rename(oldpath, newp, function (err) {
          if (err) {
            res.redirect("/admin/nueva-pizza");
            throw err;
          } else {
            console.log("Archivo cargado y almacenado.!");
            console.log(fields);

            axios
              .post(`${apiOptions.server}/api/pizzas`, {
                Nombre: fields.nombre,
                Descripcion: fields.descripcion,
                Categoria: fields.categoria,
                TipoMasa: fields.tipomasa,
                Tamanio: fields.tamanio,
                Precio: parseFloat(fields.precio),
                Imagen: nombreArchivo,
                Ingredientes: fields.ingredientes,
              })
              .then(function (response) {
                axios
                  .get(`${apiOptions.server}/api/ingredientes`)
                  .then(function (response) {
                    res.render("admin_nueva_pizza", {
                      title: "Add New Pizza",
                      mensaje: "Se ha agrergado un nuevo producto" + fields.nombre,
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
          }
        });
      } else {
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
      }
    } else {
      //res.redirect("/admin/nuevo-ingrediente");
       
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
  });
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
  const form = new formidable.IncomingForm();
  //const form = formidable({ multiples: true });
  form.parse(req, function (err, fields, files) {
   // console.log(fields); 
    if((files.imagen.name == '' && fields.imagenh !='')   && fields.nombre != "" && fields.descripcion != ''&& fields.categoria != ''&& fields.tipomasa != ''&& fields.tamanio != '' && fields.precio != ''&& fields.ingredientes != ''){
         
            console.log("Archivo cargado y almacenado.!");
            console.log(fields);
            console.log("==========ACTUALIZAR");
            axios
            .put(`${apiOptions.server}/api/pizzas/${req.params._id}`, {
              Nombre: fields.nombre,
              Descripcion: fields.descripcion,
              Categoria: fields.categoria,
              TipoMasa: fields.tipomasa,
              Tamanio: fields.tamanio,
              Precio: parseFloat(fields.precio),
              Imagen: fields.imagenh,
              Ingredientes: fields.ingredientes,
            })
            .then(function () {
                  
                editPizzaViewUpdated(req,res,fields.nombre + " se ha actualizado!");
        
            });
          
       
    }
    else if ((files.imagen.name != ''&& fields.imagenh)  && fields.nombre != "" && fields.descripcion != ''&& fields.categoria != ''&& fields.tipomasa != ''&& fields.tamanio != '' && fields.precio != ''&& fields.ingredientes != '') {
       
      if (tipoArchivo(files.imagen.name)) {
        const oldpath = files.imagen.path;
        const newpath = "./uploads/";

        const nombreCortado = files.imagen.name.split("."); // wolverine.1.3.jpg
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //Path para guardar la imagen
        const newp = newpath + tipo + "/" + nombreArchivo;
        const pathActual = `./uploads/pizzas/${fields.imagenh}`;
        if ( fs.existsSync( pathActual ) ) {
          // borrar la imagen anterior
          fs.unlinkSync( pathActual );
        }


        fs.rename(oldpath, newp, function (err) {
          if (err) {
            res.redirect(`/admin/editar-pizza/${req.params._id}`);
            throw err;
          } else {
            console.log("Archivo cargado y almacenado.!");
            //console.log(fields);
            console.log("==========ACTUALIZAR");
            axios
            .put(`${apiOptions.server}/api/pizzas/${req.params._id}`, {
              Nombre: fields.nombre,
              Descripcion: fields.descripcion,
              Categoria: fields.categoria,
              TipoMasa: fields.tipomasa,
              Tamanio: fields.tamanio,
              Precio: parseFloat(fields.precio),
              Imagen: nombreArchivo,
              Ingredientes: fields.ingredientes,
            })
            .then(function () {
                  
                editPizzaViewUpdated(req,res,fields.nombre + " se ha actualizado!");
        
            });
             
          }
        });

      } else {
        // res.redirect("/admin/nuevo-ingrediente");
         
        editPizzaViewUpdated(req,res,"Tipo de archivo inválido");
      }
    } else {
      //res.redirect("/admin/nuevo-ingrediente");
      editPizzaViewUpdated(req,res,"Todos los campos deben estar llenos");
       
    }
  });



  
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizzaView,
  addNuevaPizza,
  updatePizza,
  editPizzaView,
};
