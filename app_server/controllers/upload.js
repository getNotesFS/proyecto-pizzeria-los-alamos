//Llamado a request

const request = require("request");
const path = require("path");
//const formidable = require("formidable");
const { v4: uuidv4 } = require('uuid');

const fs = require("fs");

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción
const {
  tipoArchivo,
  subirArchivo,subirArchivo2
} = require("../../helpers/actualizar-imagen");

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
}

/*GET -> About*/

const uploadFile2 = (req, res) => {
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

const uploadFile = ( req, res = response ) => {

  const tipo = "ingredientes";
  const id = "5fdc868907c545190049635a";

  // Validar que exista un archivo
  
  console.log(req.files);
  
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
          ok: false,
          msg: 'No hay ningún archivo'
      });
  }

  // Procesar la imagen...
  const file = req.files.imagen;
  const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
  
  // Validar extension 
  const extensionesValidas = ['png','jpg','jpeg','gif'];
  if ( !extensionesValidas.includes( extensionArchivo ) ) {
      return res.status(400).json({
          ok: false,
          msg: 'No es una extensión permitida'
      });
  }
  // Generar el nombre del archivo
  const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
  console.log(nombreArchivo);
  // Path para guardar la imagen
  const paths = `./uploads/${ tipo }/${ nombreArchivo }`;
  // Mover la imagen
  file.mv( paths , (err) => {
      if (err){
          console.log(err)
          return res.status(500).json({
              ok: false,
              msg: 'Error al mover la imagen'
          });
      }
      res.json({
          ok: true,
          msg: 'Archivo subido',
          nombreArchivo
      });

  });

  //END

}


const upload = (req, res) => {
  res.render("upload", { title: "UPLOAD" });
};

module.exports = {
  //separador de módulos con una "COMA"
  upload,
  uploadFile,
};
