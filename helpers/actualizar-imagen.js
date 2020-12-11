const mongoose = require('mongoose');
const Ingrediente = mongoose.model("ingredientes");
const fs = require('fs');

 

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



module.exports = { 
    actualizarImagen
}
