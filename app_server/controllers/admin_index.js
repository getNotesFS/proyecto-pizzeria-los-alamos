 
 /*Controladores */
//Llamado a request 
const request = require("request");
// Modules
const passport = require("passport");

 
const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}
 
  const adminIndex = (req, res) => {
    res.render('admin_index', { title: 'Panel de Control' });
    
  }
  
    module.exports =  {
        //separador de módulos con una "COMA"
        adminIndex
  
    }