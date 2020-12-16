var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ofertas_schema = new Schema({
  Imagen: { type: String, required: true },
  Descripcion: { type: String, required: true },
  Nombre: { type: String, required: true },
});

const Ofertas = new mongoose.model('ofertas', ofertas_schema); // compilar el esquema en el modelo

const ofertas = new Ofertas({
    Imagen: 'pizzaJamon',
    Descripcion: 'Oferta del 50% en las papas fritas solo en el local',
    Nombre: 'Papas Fritas',
});

//ofertas.save();

module.exports = Ofertas;