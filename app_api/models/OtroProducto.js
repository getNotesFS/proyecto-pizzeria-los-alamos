var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var otroProducto_schema = new Schema({
  Nombre: { type: String, required: true },
  Tipo: { type: String, required: true },
  Descripcion: { type: String, required: true },
  Stock: { type: Number, required: true },
  Cantidad: { type: Number, required: true },
  Precio: { type: Number, required: true },
  Imagen:{type:String,required:false}
});

const OtroProducto = new mongoose.model('otroProducto', otroProducto_schema); // compilar el esquema en el modelo

const otroProducto = new OtroProducto({
  Nombre: 'cola',
  Tipo: 'gaseosa',
  Descripcion: 'cola de sabor manzana',
  Stock: true,
  Cantidad: 3,
  Precio: 1
});

//otroProducto.save();

module.exports = OtroProducto;