//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require("mongoose");
const oferta = mongoose.model("ofertas");

//Controladores
const ofertaCreate = (req, res) => {
  oferta.create(
    {
      Imagen: req.body.Imagen,
      Descripcion: req.body.Descripcion,
      Nombre: req.body.Nombre,
    },
    (err, objetoOferta) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(objetoOferta);
      }
    }
  );
};

const ofertaList = (req, res) => {
  oferta //nombre del modelo
    .find()
    .exec((err, objetoOferta) => {
      if (!objetoOferta) {
        console.log(`no existen documentos en la coleccion: ${oferta}`);
        return res.status(404).json({
          "Mensaje ": "No existen oferta",
        });
      } else if (err) {
        console.log(`Se encontro un error en la coleccion: ${oferta}`);
        return res.status(404).json(err);
      }
      console.log(`Se encontraron documentos en la coleccion ${oferta}`);
      res.status(200).json(objetoOferta);
    });
};

const ofertaRead = (req, res) => {
  oferta //nombre del modelo
    .findById(req.params.ofertaid)
    .exec((err, objetoOferta) => {
      if (!objetoOferta) {
        console.log(`oferta no encontrada con el id: ${req.params.ofertaid}`);
        return res.status(404).json({
          "Mensaje ": "oferta no encontrado",
        });
      } else if (err) {
        console.log(`Se encontro un error en la oferta con el id: ${req.params.ofertaid}`);
        return res.status(404).json(err);
      }
      console.log(`Se encontro el documento oferta con el id: ${req.params.ofertaid}`);
      res.status(200).json(objetoOferta);
    });
};

const ofertaUpdate = (req, res) => {
  if (!req.params.ofertaid) {
    return res
      .status(404)
      .json({
        Mensaje:
          "El ID Oferta ingresado no existe, ingrese un ID OFERTA válido.",
      });
  }

  oferta
    .findById(req.params.ofertaid)
    .exec((err, objetoOferta) => {
      if (!objetoOferta) {
        return res
          .status(404)
          .json({ Mensaje: "El ID Oferta no encontrado." });
      }
      objetoOferta.Imagen = req.body.Imagen;
      objetoOferta.Descripcion = req.body.Descripcion;
      objetoOferta.Nombre = req.body.Nombre;   
      objetoOferta.save((err, Oferta) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(Oferta);
        }
      });
    });
};
const ofertaDelete = (req, res) => {
  if (req.params.ofertaid) {
    oferta
      .findByIdAndDelete(req.params.ofertaid)
      .exec((err, objetoOferta) => {
        if (err) {
          return res.status(404).json(err);
        }
        res.status(204).json(null);
      });
  } else {
    res.status(404).json({ Mensaje: "Ofertas no encontrado" });
  }
};

module.exports = {
  ofertaCreate,
  ofertaDelete,
  ofertaList,
  ofertaRead,
  ofertaUpdate,
};
