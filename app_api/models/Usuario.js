const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 


const datos_schema = new Schema({
  Cedula: { type: Number, required: false, default:0 },
  Provincia: { type: String, required: false, default:"" },
  Ciudad: { type: String, required: false, default:"" },
  DireccionFacturacion: { type: String, required: false, default:"" },
  DireccionEnvio: { type: String, required: false, default:"" },
  Referencia: { type: String, required: false, default:""  },
  TelefonoConvencional: { type: Number, default: 0},
  TelefonoCelular: { type: Number, required: false, default:0 },
  CodigoPostal: { type: Number, required: false, default:0 },
});


var usuario_schema = new Schema({
  Nombres: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String,required: true, unique:true },
  Contrasenia: { type: String, required: true },
  TipoUsuario: { type: Number, required: false, default:0},
  Datos:datos_schema,
  HistorialPedidos: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "HistorialPedidos",
  },
});

usuario_schema.pre('save', function(next){
  bcrypt.genSalt(10).then(salts =>{
    bcrypt.hash(this.Contrasenia,salts).then(hash =>{
      this.Contrasenia = hash;
      next();
    }).catch(error => next(error));
  }).catch(error => next(error));
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


//usuario.save(); // guardar en DB
 
 module.exports = Usuario;