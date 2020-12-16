/*Controladores */
//Llamado a request
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
//print LISTADO
const adminNuevoIngredienteView = (req, res) => {
  res.render("admin_nuevo_ingrediente", { title: "Listado Productos" });
};

//ADD NUEVO INGREDIENTE
const addNewIngrediente = (req, res) => {
  const tipo = "ingredientes";
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    //console.log(files);
    if (files.imagen.name != "" && fields.nombre != "" && fields.precio != "") {
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
            res.redirect("/admin/nuevo-ingrediente");
            throw err;
          } else {
            console.log("Archivo cargado y almacenado.!");
            console.log(fields);

            axios
              .post(`${apiOptions.server}/api/ingredientes`, {
                Nombre: fields.nombre,
                Imagen: nombreArchivo,
                Precio: parseFloat(fields.precio),
              })
              .then(function (response) {
                console.log("Guardado");
                res.render("admin_nuevo_ingrediente", {
                  title: "Add New Ingrediente",
                  mensaje:
                    "Se ha agrergado un nuevo ingrediente " + fields.nombre,
                });
              })
              .catch(function (error) {
                // console.log(error);
                console.log("algun error");
              });
          }
        });
      } else {
        // res.redirect("/admin/nuevo-ingrediente");
        res.render("admin_nuevo_ingrediente", {
          title: "Nuevo Ingrediente",
          mensaje: "Tipo de archivo inválido",
        });
      }
    } else {
      //res.redirect("/admin/nuevo-ingrediente");
      res.render("admin_nuevo_ingrediente", {
        title: "Nuevo Ingrediente",
        mensaje: "Todos los campos deben estar llenos",
      });
    }
  });
};

//MOSTRAR INGREDIENTE EN FORMULARIO EDITAR
const editIngredienteView = (req, res) => {
  axios
    .get(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function (response) {
      console.log(response.data);
      res.render("admin_editar_ingrediente", {
        title: "Actualizar " + response.data.Nombre,
        mensaje:"",
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
        mensaje:mensajeUpd,
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
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(fields); 
    if((files.imagen.name == '' && fields.imagenh !='')  && fields.nombre != "" && fields.precio != ""){
         
            console.log("Archivo cargado y almacenado.!");
            //console.log(fields);
            console.log("==========ACTUALIZAR");
            axios
              .put(`${apiOptions.server}/api/ingredientes/${req.params._id}`, {
                Nombre: fields.nombre,
                Precio: fields.precio,
                Imagen:  fields.imagenh,
              })
              .then(function () {
                editIngredienteViewUpdated(req,res,fields.nombre + " se ha actualizado!");
                
              });
          
       
    }
    else if ((files.imagen.name != ''&& fields.imagenh) && fields.nombre != "" && fields.precio != "") {
       
      if (tipoArchivo(files.imagen.name)) {
        const oldpath = files.imagen.path;
        const newpath = "./uploads/";

        const nombreCortado = files.imagen.name.split("."); // wolverine.1.3.jpg
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

        //Path para guardar la imagen
        const newp = newpath + tipo + "/" + nombreArchivo;
        const pathActual = `./uploads/ingredientes/${fields.imagenh}`;
        if ( fs.existsSync( pathActual ) ) {
          // borrar la imagen anterior
          fs.unlinkSync( pathActual );
        }


        fs.rename(oldpath, newp, function (err) {
          if (err) {
            res.redirect(`/admin/editar-ingrediente/${req.params._id}`);
            throw err;
          } else {
            console.log("Archivo cargado y almacenado.!");
            //console.log(fields);
            console.log("==========ACTUALIZAR");
            axios
              .put(`${apiOptions.server}/api/ingredientes/${req.params._id}`, {
                Nombre: fields.nombre,
                Precio: fields.precio,
                Imagen: nombreArchivo,
              })
              .then(function () {
                editIngredienteViewUpdated(req,res,fields.nombre + " se ha actualizado!");
                
              });
          }
        });

      } else {
        // res.redirect("/admin/nuevo-ingrediente");
         
        editIngredienteViewUpdated(req,res,"Tipo de archivo inválido");
      }
    } else {
      //res.redirect("/admin/nuevo-ingrediente");
      editIngredienteViewUpdated(req,res,"Todos los campos deben estar llenos");
       
    }
  });
};

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevoIngredienteView,
  addNewIngrediente,
  editIngredienteView,
  UpdateIngrediente,
};
