var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var detallesOrden_schema = new Schema({
  CantidadPizzas: [
    { type: Schema.Types.ObjectId, required: true, ref: "CantidadPizzas" },
  ],
  CantidadOtrosProductos: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "CantidadOtrosProductos",
    },
  ],
});


const DetallesOrden = new mongoose.model('detallesOrden', detallesOrden_schema); // compilar el esquema en el modelo


const detallesOrden = new DetallesOrden({
  CantidadPizzas:['5f84146936b73202ac1e8d07','5f84146936b73202ac1e8d07'],
  CantidadOtrosProductos:['5f84151b6314ef39e8a17cfe','5f84151b6314ef39e8a17cfe']
});

//detallesOrden.save();
module.exports = DetallesOrden;