const mongoose = require('mongoose');
const readLine = require('readline');
//Localhost debería de cambiar por el servidor en el que está la base de datos

//const dbURI = 'mongodb://localhost/bigpizzadb';
//let dbURI = "mongodb+srv://dbadmin:admin1234@cluster0.89fqu.gcp.mongodb.net/bigpizzadb?retryWrites=true&w=majority";
let dbURI = "mongodb://localhost/bigpizzadb";

if (process.env.NODE_ENV === "production") {
 dbURI = process.env.MONGODB_URI;
 console.log("Se esta conectando a la DB remota");
} 
 
mongoose.connect(dbURI, { useNewUrlParser: true,useCreateIndex:true, useFindAndModify: false  });


/*
//MULTIPLE DATA BASE
const dbURIlog = 'mongodb://localhost/mibasededatosLog';
const logDB = mongoose.createConnection(dbURIlog);
*/


if (process.platform === 'win32') {
   const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
   });
   rl.on('SIGINT', () => {
      process.emit("SIGINT");
   });
}

//CLOSE
const procShutdown = (msg, callback) => {
   mongoose.connection.close(() => {
      console.log(`Mongoose disconnected through ${msg}`);
      callback();
   });
};

//CALL PROCSHUTDOWN
// Evento SIGUSR2 - nodemon
process.once('SIGUSR2', () => {
   procShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2');
   });
});
// Evento SIGINT - windows
process.on('SIGINT', () => {
   procShutdown('app windows termination', () => {
      process.exit(0);
   });
});
// Evento SIGTERM - heroku
process.on('SIGTERM', () => {
   procShutdownnodemon('Heroku app shutdown', () => {
      process.exit(0);
   });
});


//MONITOREO DB1========================
//VERIFICACION DE CONEXIÓN

mongoose.connection.on('connected', () => {
   console.log(`Mongoose se conectó a ${dbURI}`);
});
mongoose.connection.on('error', err => {
   console.log('Mongoose error de conexión:', err);
});
mongoose.connection.on('disconnected', () => {
   console.log('Mongoose desconectado');
});

//MONITOREO DB2 =================================
  
/*
// DB conectada
logDB.on('connected', () => {
   console.log(`Mongoose log se conectó a  ${dbURIlog}`);
});
// Error de conexion
logDB.on('error', err => {
   console.log("Mongoose log error de conexión: ", err);
});
// Desconexión
logDB.on('disconnected', () => {
   console.log('Mongoose log está desconectado');
});
*/

// Cerrar la conexion
// logDB.close(() => {
//    console.log('Mongoose log cerrada');
// });


//require('./locations');
//require('./esquema1');


require('./Ingredientes');
require('./Pizza');
require('./OtroProducto'); 
require('./Usuario');

require('./CantidadPizzas');

require('./CantidadOtrosProductos');

require('./DetallesOrden');

require('./Pedido');

require('./HistorialPedidos');

require('./Ofertas');
 




