var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ingredientes_schema = new Schema({
  Nombre: { type: String, required: true },
  Imagen: { type: String, required: true },
  Precio: { type: Number, required: true },
});


const Ingredientes = new mongoose.model("ingredientes", ingredientes_schema); 

const ingredientes = new Ingredientes({
  Nombre: 'champiniones',
  Imagen: 'champiniones',
  Precio: 1
});


ingredientes.save();

module.exports = Ingredientes;