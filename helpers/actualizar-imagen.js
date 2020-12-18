const mongoose = require('mongoose');
const Ingrediente = mongoose.model("ingredientes");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

 

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
         
        case 'ingredientes':

            const ingrediente = await Ingrediente.findById(id);
            if ( !ingrediente ) {
                console.log('No es un ingrediente por id');
                return false;
            }

            pathViejo = `./uploads/ingredientes/${ ingrediente.Imagen }`;
            borrarImagen( pathViejo );

            ingrediente.Imagen = nombreArchivo;
            await ingrediente.save();
            return true;

        break;
    }


}

const tipoArchivo =  (name)=> {

    const nombreCortado = name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
   
   // Validar extension
   const extensionesValidas = ['png','jpg','jpeg','gif'];
   return extensionesValidas.includes(extensionArchivo) 
    
}
const subirArchivo = async(tipo, id,oldpath,newpath,name, current)=> {
    
     const nombreCortado = name.split('.'); // wolverine.1.3.jpg
     const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        /*return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });*/
        
       console.log("No es una extensión permitida");
    }

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar la imagen
    const newp = newpath+tipo+'/'+nombreArchivo;

    fs.rename(oldpath, newp, function (err) {
        if (err) throw err;
        console.log("Archivo cargado y almacenado.!");
       // res.end();
         // Actualizar base de datos
         actualizarImagen( tipo, id, nombreArchivo );

         console.log("============IMAGEN CARGADA");
      });

   

    
}

const subirArchivo2 =  (req,res=response,file)=> {

     
    
  const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
  const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
  
  const extensionesValidas = ['png','jpg','jpeg','gif'];
  if ( !extensionesValidas.includes( extensionArchivo ) ) {
      return res.status(400).json({
          ok: false,
          msg: 'No es una extensión permitida'
      });
  }
  // Validar extension

  console.log(file);
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
}


module.exports = { 
    actualizarImagen,
    subirArchivo,
    tipoArchivo,
    borrarImagen,
    subirArchivo2
}
