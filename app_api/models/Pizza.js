const mongoose = require("mongoose");
const Ingredientes = require("./Ingredientes");
const Schema = mongoose.Schema;

const pizza_schema = new Schema({
  Nombre: { type: String, required: true },
  Descripcion: { type: String, required: true },
  Categoria: { type: String, required: true },
  TipoMasa: { type: Boolean, required: true,default: false },
  Tamanio: { type: Number, required: true },
  Precio: { type: Number, required: true },
  Imagen: { type: String, required: true },
  
  Ingredientes: [
    { type: Schema.Types.ObjectId,
      required:true,
       ref: "Ingredientes" },
  ],
});

const Pizza = new mongoose.model("pizza", pizza_schema); // compilar el esquema en el modelo



const pizza = new Pizza({
  Nombre: 'peperonni',
  Descripcion: 'Pizza de peperoni',
  Categoria: 'Pizza',
  TipoMasa: true,
  Tamanio: 2,
  Precio: 3,
  Imagen:'peperonni_img',
  Ingredientes:['5f840b15a2238515042eaba4','5f840b15a2238515042eaba4']
});




//pizza.save(); // guardar en DB

 
module.exports = Pizza;