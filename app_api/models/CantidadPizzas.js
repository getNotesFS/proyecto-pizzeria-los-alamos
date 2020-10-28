const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const cantidadPizzas_schema = new Schema({
  Cantidad: { type: Number, required: true },
  PrecioUnitario: { type: Number, required: true },
  Pizza: { type: Schema.Types.ObjectId, required: true, ref: "Pizza" },
});


const CantidadPizzas = new mongoose.model('cantidadPizzas', cantidadPizzas_schema); // compilar el esquema en el modelo
const cantidadPizzas = new CantidadPizzas({
  Cantidad: 2,
  PrecioUnitario: 18,
  Pizza:'5f851c8423ee964cd02ff2aa'
});
//pizza_schema
//cantidadPizzas.save();
module.exports = cantidadPizzas;