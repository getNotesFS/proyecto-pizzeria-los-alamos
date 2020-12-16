 /*Controladores */
//Llamado a request
//const { get } = require("request");
const request = require("request");
// Modules 
const { response } = require("express");


/*
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';*/

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}
 
  const adminListadoUsuarios = (req, res) => {

    axios.get(`${apiOptions.server}/api/usuarios`)
      .then(function (response) {
        res.render("login_register", {
          title: "Listado Usuarios",
          usuariosList: response.data,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  
  };
  


//Get Usuario
const getUsuario = (req, res) => {
  console.log("===========GET Usuario");
  console.log("===========" + req.params._id);
 
  axios.get(`${apiOptions.server}/api/usuarios/${req.params._id}`)
    .then(function (response) {
      console.log(response.data); 
        res.render("admin_editar_usuario", {
          title: "Actualizar " + response.data.Nombre,
          _id: response.data._id,
          nombre: response.data.Nombre,
          apellido: response.data.Apellido,
          correo: response.data.Correo,
          contrasenia: response.data.Contrasenia,
        });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  
  
};


//update usuario
const UpdateUsuario = (req, res) =>{
  console.log("==========ACTUALIZAR");
  console.log(req.body);

  const path = "/api/ingredientes";
  const putdata = {
    nombre: req.body.Nombre,
    apellido: req.body.Apellido,
    correo: req.body.Correo,
    contrasenia: req.body.Contrasenia
  };

  const requestOptions = {
    url: `${apiOptions.server}${path}/${req.params.codigo}`,
    method: "PUT",
    json: putdata,
  };

  request(requestOptions, (err, { statusCode }, { name }, body) => {
    if (statusCode === 200) {
      console.log("Ha actualizado");
      res.redirect("/admin/listado-usuarios");
    } else if (statusCode === 400 && name && name === "ValidationError") {
      res.redirect("/admin/listado-usuarios?err=val");
      console.log(body);
    } else {
      // showError(req, res, statusCode);
      console.log(err);
    }
  });
};


  //delete
  const deleteUsuario = () =>{
    console.log("======DELETE Usuario");
    console.log("=========================>" + req.params._id);
    //delete Axios
    axios.delete(`${apiOptions.server}/api/usuarios/${req.params._id}`)
      .then(function () {
        console.log("DELETED");
        res.redirect(`/admin/listado-usuarios`);
      });
  }


  //ADD NUEVO INGREDIENTE
const addNewUsuario = (req, res) => {
    
  
  axios.get(`${apiOptions.server}/api/usuarios/mail/${req.body.correo}`)
  .then(function (response) {
  
    console.log("=================",response.data);  
    
    if(response.data.Correo == req.body.correo ){ 
      
       res.redirect("/login-register"); 
    } 
 
  })
  .catch(function (error) {
     
    console.log(error);
    createU(req,res);
  })
  .then(function () {
    // always executed
  });
  

  

 
};

const createU = (req,res=response)=>{

  axios.post(`${apiOptions.server}/api/register`, { 
    Nombres: req.body.nombre,
    Apellidos: req.body.apellido,
    Correo: req.body.correo,
    Contrasenia: req.body.contrasenia
  })
  .then(function (response) {
    console.log("Guardado"); 
   res.redirect(`/my-account`);
  })
  .catch(function (error) {
    console.log(error.response);
  });
}

    //delete
    const loginRegister = (req, res) =>{
      
      res.render("login_register", {
        title: "Login / Registro"
       
      });
    }

    //LOGIN
    const login = (req, res) =>{
      
       
      
      axios.post(`${apiOptions.server}/api/login`, {  
        email: req.body.Correo,
        password: req.body.Contrasenia
      })
      .then(function (response) {
        console.log("LOGIN"); 
        res.redirect(`/my-account`);
      })
      .catch(function (error) {
        console.log(error.response);
        res.redirect(`/login-register`);
      });
 

    }


    
  
   const logout = (req, res) => {
    req.logout();
    //req.flash("success_msg", "You are logged out now.");
    res.redirect("/login-register");
  };


    module.exports =  {
        //separador de módulos con una "COMA"
        loginRegister,
        addNewUsuario,
        deleteUsuario,
        UpdateUsuario,
        getUsuario,
        adminListadoUsuarios,
        login
  
    }