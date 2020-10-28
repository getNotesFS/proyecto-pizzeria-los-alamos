var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var datos_schema = new Schema({
  Cedula: { type: Number, required: true },
  Provincia: { type: String, required: true },
  Ciudad: { type: String, required: true },
  DireccionFacturacion: { type: String, required: true },
  DireccionEnvio: { type: String, required: true },
  Referencia: { type: String },
  TelefonoConvencional: { type: Number },
  TelefonoCelular: { type: Number, required: true },
  CodigoPostal: { type: Number, required: true },
});


var usuario_schema = new Schema({
  TipoUsuario: { type: Number, required: true, default:0},
  Nombres: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String, required: true },
  Contrasenia: { type: String, required: true },
  Datos:datos_schema,
  HistorialPedidos: {
    type: Schema.Types.ObjectId,
   
    ref: "HistorialPedidos",
  },
});


const Usuario = new mongoose.model('usuario', usuario_schema); // compilar el esquema en el modelo
const Datos = new mongoose.model('datosUsuario', datos_schema); // compilar el esquema en el modelo

const usuario = new Usuario({
  TipoUsuario: 0,

  Nombres: 'Josue Nicolas LL',
  Apellidos: 'Rubio Jaramillo',
  Correo: 'jnrubioj@estud.usfq.edu.ec',
  Contrasenia: 'contraseña',
  Datos:{ 
    Cedula: 1722508585,
    Provincia: 'Pichincha',
    Ciudad: 'Quito',
    DireccionFacturacion: 'Quito-Ecuador',
    DireccionEnvio: 'Calderon',
    Referencia: 'Hospital de Calderon',
    TelefonoConvencional: 2813237,
    TelefonoCelular: 098185581,
    CodigoPostal: 210578
  }
  
});


usuario.save(); // guardar en DB


module.exports = Usuario;