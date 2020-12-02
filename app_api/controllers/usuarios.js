//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require("mongoose");
const usuarios = mongoose.model("usuario");

//Controladores
const usuarioCreate = (req, res) => {
  usuarios.create(
    {
      TipoUsuario: req.body.TipoUsuario,
      Nombres: req.body.Nombres,
      Apellidos: req.body.Apellidos,
      Correo: req.body.Correo,
      Contrasenia: req.body.Contrasenia,
      
      Datos: {
        Cedula: req.body.Cedula,
        Provincia: req.body.Provincia,
        Ciudad: req.body.Ciudad,
        DireccionFacturacion: req.body.DireccionFacturacion,
        DireccionEnvio: req.body.DireccionEnvio,
        Referencia: req.body.Referencia,
        TelefonoConvencional: req.body.TelefonoConvencional,
        TelefonoCelular: req.body.TelefonoCelular,
        CodigoPostal: req.body.CodigoPostal,
      }
    },
    (err, objetoUsuario) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(objetoUsuario);
      }
    }
  );
};

const usuarioList = (req, res) => {
  usuarios //nombre del modelo
    .find()
    .exec((err, objetoUsuario) => {
      if (!objetoUsuario) {
        console.log(`no existen documentos en la coleccion: ${usuarios}`);
        return res.status(404).json({
          "Mensaje ": "No existen usuario",
        });
      } else if (err) {
        console.log(`Se encontro un error en la coleccion: ${usuarios}`);
        return res.status(404).json(err);
      }
      console.log(`Se encontraron documentos en la coleccion ${usuarios}`);
      res.status(200).json(objetoUsuario);
    });
};

const usuarioRead = (req, res) => {
  usuarios //nombre del modelo
    .findById(req.params.usuarioid)
    .exec((err, objetoUsuario) => {
      if (!objetoUsuario) {
        console.log(`Pizza no encontrada con el id: ${req.params.usuarioid}`);
        return res.status(404).json({
          "Mensaje ": "Pizza no encontrado",
        });
      } else if (err) {
        console.log(
          `Se encontro un error en la pizza con el id: ${req.params.usuarioid}`
        );
        return res.status(404).json(err);
      }
      console.log(
        `Se encontro el documento pizza con el id: ${req.params.usuarioid}`
      );
      res.status(200).json(objetoUsuario);
    });
};
const usuarioReadExist = (req, res) => {
  usuarios //nombre del modelo
    .findOne({'Correo':req.params.email})
    .exec((err, objetoUsuario) => {
      if (!objetoUsuario) {
        console.log(`Correo no encontrada con el id: ${req.params.email}`);
        return res.status(404).json({
          "Mensaje ": "Correo no encontrado",
          "status":404
        });
      } else if (err) {
        console.log(
          `Se encontro un error en con el correo: ${req.params.email}`
        );
        return res.status(404).json(err);
      }
      console.log(
        `Se encontro el documento con el Correo : ${req.params.email}`
      );
      res.status(200).json(objetoUsuario);
    });
};

const usuarioUpdate = (req, res) => {
  if (!req.params.usuarioid) {
    return res
      .status(404)
      .json({
        Mensaje:
          "El ID Usuario ingresado no existe, ingrese un ID usuario valido.",
      });
  }

  usuarios
  .findById(req.params.usuarioid)
  .exec((err, objetoUsuario) => {
    if (!objetoUsuario) {
      return res
      .status(404)
      .json({ Mensaje: "El ID Usuario no econtrado" });
    }
    objetoUsuario.Nombres = req.body.Nombres;
    objetoUsuario.Apellidos = req.body.Apellidos;
    objetoUsuario.Correo = req.body.Correo;
    objetoUsuario.Contrasenia = req.body.Contrasenia;
    objetoUsuario.TipoUsuario = req.body.TipoUsuario;
    objetoUsuario.Datos = {
      Cedula : req.body.Cedula,
      Provincia : req.body.Provincia,
      Ciudad : req.body.Ciudad,
      DireccionFacturacion : req.body.DireccionFacturacion,
      DireccionEnvio : req.body.DireccionEnvio,
      Referencia : req.body.Referencia,
      TelefonoConvencional : req.body.TelefonoConvencional,
      TelefonoCelular : req.body.TelefonoCelular,
      CodigoPostal : req.body.CodigoPostal

    };
    
    objetoUsuario.save((err, Usuarios) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(Usuarios);
      }
    });
  });
};

const usuarioDelete = (req, res) => {
  if (req.params.usuarioid) {
    usuarios
      .findByIdAndDelete(req.params.usuarioid)
      .exec((err, objetoUsuario) => {
        if (err) {
          return res.status(404).json(err);
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({ Mensaje: "Usuario no encontrado" });
  }
};

module.exports = {
  usuarioCreate,
  usuarioDelete,
  usuarioList,
  usuarioRead,
  usuarioUpdate,
  usuarioReadExist
};
