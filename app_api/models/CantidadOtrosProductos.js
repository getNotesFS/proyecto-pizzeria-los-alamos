const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cantidadOtrosProductos_schema = new Schema({
  Cantidad: { type: Number, required: true },
  OtroProducto: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "OtroProducto",
  },
});

const CantidadOtrosProductos = new mongoose.model('cantidadOtrosProductos', cantidadOtrosProductos_schema); // compilar el esquema en el modelo
const cantidadOtrosProductos = new CantidadOtrosProductos({
    Cantidad: 2,
    OtroProducto:'5f84abe0b517f91f18f50f85'
});

//cantidadOtrosProductos.save();

module.exports = cantidadOtrosProductos;
 