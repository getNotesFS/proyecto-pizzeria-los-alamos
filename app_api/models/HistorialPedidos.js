var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var historialPedidos_schema = new Schema({
  Pedido: [{ 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: "Pedido" }]
});

const HistorialPedidos = new mongoose.model('historialPedidos', historialPedidos_schema);
const historialPedido = new HistorialPedidos({
  Pedido:['5f841647a943b40680f5fdf7']
});

historialPedido.save();

module.exports = HistorialPedidos;

