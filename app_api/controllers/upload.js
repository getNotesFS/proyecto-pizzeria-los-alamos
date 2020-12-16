const path = require('path');
const fs = require('fs');

const FormData = require('form-data');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { subirArchivo } = require('../../helpers/actualizar-imagen');


const fileUpload = ( req, res = response ) => {

    // const tipo = req.params.tipo;
    // const id   = req.params.id;
     
    const tipo = 'ingredientes';
    const id   = '5faf0eddc98c9728a8c0f3f1';
    var form = new formidable.IncomingForm();
     
    // Validar tipo
    const tiposValidos = ['ingredientes','pizzas','usuarios'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un ingrediente, usuario u pizzas (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

   
    form.parse(req, function (err, fields, files) {
       
      var oldpath = files.imagen.path;
      var newpath = './uploads/';
      
      //console.log(oldpath);
      subirArchivo(tipo, id,oldpath,newpath,files.imagen.name);
      
    });
    

}


const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../../uploads/${ tipo }/${ foto }` );

    // imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}