//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const usuarios = mongoose.model('usuario');

//Controladores
const usuarioCreate = (req, res) => {
    usuarios.create({
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Correo: req.body.Correo,
        Contrasenia: req.body.Contrasenia,
        Datos:{
            Cedula:req.body.Cedula,
            Provincia:req.body.Provincia,
            Ciudad:req.body.Ciudad,
            DireccionFacturacion:req.body.DireccionFacturacion,
            DireccionEnvio:req.body.DireccionEnvio,
            Referencia:req.body.Referencia,
            TelefonoConvencional:req.body.TelefonoConvencional,
            TelefonoCelular:req.body.TelefonoCelular,
            CodigoPostal:req.body.CodigoPostal,
        }
        
    },(err, objetoUsuario) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoUsuario);
        }
    });
};

const usuarioList = (req, res) => {
    usuarios //nombre del modelo
        .find({
            'Nombres' : 'Steven Frank'
        })
        .exec((err, objetoUsuario)=>{
            if(!objetoUsuario){
                console.log(`no existen documentos en la coleccion: ${usuarios}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen usuario"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${usuarios}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${usuarios}`);
            res
                .status(200)    
                .json(objetoUsuario);
        });
};


const usuarioRead = (req, res) => {
    usuarios //nombre del modelo
        .findById(req.params.usuarioid)
        .exec((err, objetoUsuario)=>{
            if(!objetoUsuario){
                console.log(`Pizza no encontrada con el id: ${req.params.usuarioid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Pizza no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la pizza con el id: ${req.params.usuarioid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento pizza con el id: ${req.params.usuarioid}`);
            res
                .status(200)    
                .json(objetoUsuario);
        });
};

const usuarioUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Usuario actualizado" });
};
const usuarioDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Usuario eliminado" });
};


module.exports = {
    usuarioCreate,
    usuarioDelete,
    usuarioList,
    usuarioRead,
    usuarioUpdate
}