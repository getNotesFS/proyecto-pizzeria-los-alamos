var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var otroProducto_schema = new Schema({
  Nombre: { type: String, required: true },
  Tipo: { type: String, required: true },
  Descripcion: { type: String, required: true },
  stock: { type: Boolean, required: true },
  cantidad: { type: Number, required: true },
  Precio: { type: Number, required: true },
});

const OtroProducto = new mongoose.model('otroProducto', otroProducto_schema); // compilar el esquema en el modelo

const otroProducto = new OtroProducto({
  Nombre: 'cola',
  Tipo: 'gaseosa',
  Descripcion: 'cola de sabor manzana',
  stock: true,
  cantidad: 3,
  Precio: 1
});

//otroProducto.save();

module.exports = OtroProducto;