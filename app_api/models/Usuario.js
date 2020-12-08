const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); 
//------
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const passport = require("passport");

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
  Apellidos: { type: String, required: false },
  Correo: { type: String,required: true, unique:true },
  Contrasenia: { type: String, required: true },
  TipoUsuario: { type: Number, required: false, default:0},
  Datos:datos_schema,
  HistorialPedidos: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "HistorialPedidos",
  },
  hash:String,
  salt:String
});

//pre encripta contraseña
/*
usuario_schema.pre('save', function(next){
  bcrypt.genSalt(10).then(salts =>{
    bcrypt.hash(this.Contrasenia,salts).then(hash =>{
      this.Contrasenia = hash;
      next();
    }).catch(error => next(error));
  }).catch(error => next(error));
});
 */
//MODO DEL LIBRO
usuario_schema.methods.setPassword = function (password) {
  
  this.salt = crypto.randomBytes(16).toString('hex');
  this.Contrasenia = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

usuario_schema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.Contrasenia === hash;
};
 
usuario_schema.methods.currentPass = function (password) {
  let current='';
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  if(this.Contrasenia === hash){
    current = password;
  }
  return  current;
};

usuario_schema.methods.currentPassEncript = function (password) {
  let current=''; 
  if(this.Contrasenia === password){
    current = password;
  }
  return  current;
};

usuario_schema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    Correo: this.email,
    Nombres: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};

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