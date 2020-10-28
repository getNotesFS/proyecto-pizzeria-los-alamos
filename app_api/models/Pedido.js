var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var pedido_schema = new Schema({
  DetallesOrden: {
    type: Schema.Types.ObjectId,
    ref: "DetallesOrden",
  },
  Usuario: { type: Schema.Types.ObjectId, required: true, ref: "Usuario" },
  Fecha: { type: Date, required: true },
  Total: { type: Number, required: true },
  SubTotal: { type: Number, required: true },
});


const Pedido = new mongoose.model('pedido', pedido_schema); // compilar el esquema en el modelo

const pedido = new Pedido({
  DetallesOrden:'5f841604d56cde44149550e7',
  Usuario:'5f841551f8a04624acb5ab65',
  Fecha: 12/10/2020,
  Total: 100,
  SubTotal: 100
});

pedido.save();

module.exports = Pedido;
