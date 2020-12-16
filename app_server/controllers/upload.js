//Llamado a request

const request = require("request");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");

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
}

/*GET -> About*/

const uploadFile = (req, res) => {
  const tipo = "ingredientes";
  const id = "5faf0eddc98c9728a8c0f3f1";

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(files);
    if (files.imagen.name != "") {
      if (tipoArchivo(files.imagen.name)) {
        var oldpath = files.imagen.path;
        var newpath = "./uploads/";
        //console.log(oldpath);
        subirArchivo(tipo, id, oldpath, newpath, files.imagen.name);
      } else {
        res.redirect("/upload");
      }
    } else {
      res.redirect("/upload");
    }
  });


};

const upload = (req, res) => {
  res.render("upload", { title: "UPLOAD" });
};

module.exports = {
  //separador de módulos con una "COMA"
  upload,
  uploadFile,
};
