 /*Controladores */
//Llamado a request
const { get } = require("request");
const request = require("request");

const axios = require("axios").default;
// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}



  /*GET -> MENU*/
/*
  const loginRegister = (req, res) => {
    res.render('login_register', { title: 'Login / Registro' });
  }
  
  const addNewRegister = (req, res) => {
    console.log("Llegaron los datos");
    console.log(req.body);
  
    const path = "api/usuarios";
    const postdata = {
      Nombre: req.body.nombre,
      Apellido: req.body.apellido,
      Categoria: req.body.categoria,
      Correo: req.body.correo,
      Contrasenia: req.body.contrasenia,
    };
  
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: "POST",
      json: postdata,
    };
  
   /* if (!postdata.Nombre) {
      res.redirect("/pizza/new?err=val");
      console.log("No hay objeto Nombre");
    } else {*/
    /*  request(requestOptions, (err, { statusCode }, { name }, body) => {
        console.log("Aqui voy");
        if (statusCode === 201) {
          //HTTP response status 201 : Creado exitoso
          /* res.redirect("/pizza/new");*/
          /*console.log("Ha recibido");
          res.render("login_register", {
            title: "Add New Register",
            mensaje: "Se ha agrergado un nuevo registro",
          });
        } else if (statusCode === 400 && name && name === "ValidationError") {
          res.redirect("/login_register?err=val");
          //FORMATO DEBE SER ASÍ SI EL ADD NEW ESTÁ EN UN PATH INDEPENDIENTE
          //res.redirect("/pizza/new?err=val");
          console.log(body);
        } else {
          showError(req, res, statusCode);
          console.log(err);
        }
      });
   // }
  };*/

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


    module.exports =  {
        //separador de módulos con una "COMA"
        //loginRegister,
        //addNewRegister,
        deleteUsuario,
        UpdateUsuario,
        getUsuario,
        adminListadoUsuarios
  
    }