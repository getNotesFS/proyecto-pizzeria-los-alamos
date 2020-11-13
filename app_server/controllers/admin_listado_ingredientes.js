
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




//Listado Ingredientes
 
const adminListadoIngredientes = (req, res)=>{
   
  const path = `/api/ingredientes`;
  const requestOptions = {
    //Objeto cargado con las Opciones
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
    qs: {},
  };
  request(
    requestOptions, // Opciones
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200 && body) {
        console.log("Listado ingredientes recuperado");
        res.render("admin_listado_ingredientes", {
          title: "Listado Ingredientes",
          ingredientesList: body
        });
      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
        console.log(err);
        
        res.render("error", {
          // usamos la vista error.pug
          error: "Error ",
          tipo: " Ingredientes: ",
          codigo: req.params.pizzaid, // código de usuario con error
          mensaje: "No existe. Ingrese uno válido",
        });
      }
    }
  );
};



//Get Ingrediente

const getIngrediente = (req, res) => {
  console.log("===========GET Ingrediente");
  console.log("==========="+req.params._id);
  
  const path = `/api/ingredientes/${req.params._id}`;

  const requestOptions = {
    //Objeto cargado con las Opciones
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
    qs: {},
  };
  request(
    requestOptions, // Opciones
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200 && body) {
        //además del statusCode, el objeto resultante debe tener contenido
        console.log(body);

        res.render("admin_listado_ingredientes", {
          title: "Actualizar " + body.Nombre,
          _id: body._id,
          nombre: body.Nombre,
          precio: body.Precio,
          imagen: body.Imagen
        }); 

      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
      }
    }
  );
};

 

/*UPDATE Ingrediente*/

const UpdateIngrediente = (req, res) => {
  console.log("==========ACTUALIZAR");
  console.log(req.body);
  
  const path = '/api/ingredientes';
  
  const putdata = {
    nombre: req.body.Nombre,
    precio: req.body.Precio,
    imagen: req.body.Imagen
  };

  const requestOptions = {
    url: `${apiOptions.server}${path}/${req.params.codigo}`,
    method: "PUT",
    json: putdata  
  };

  request(requestOptions, (err, { statusCode }, { name }, body) => {
    if (statusCode === 200) {
      console.log("Ha actualizado");
      res.redirect("/admin/listado-ingredientes");
      
    } else if (statusCode === 400 && name && name === "ValidationError") {
      res.redirect("/admin/listado-ingredientes?err=val");
      console.log(body);
    } else {
     // showError(req, res, statusCode);
      console.log(err);
    }
  });
};

//delete 
const deleteIngrediente =  (req, res) => {
  console.log("======DELETE Ingrediente");
  console.log("=========================>"+req.params._id);
//delete Axios
  axios.delete(`${apiOptions.server}/api/ingredientes/${req.params._id}`)
    .then(function(){
      // Observe the data keyword this time. Very important
      // payload is the request body
      // Do something
      console.log("DELETED");
      res.redirect(`/admin/listado-ingredientes`);
    });

  /*
  const path = `/api/ingredientes/${req.params._id}`;


    const requestOptions = {
      //Objeto cargado con las Opciones
      url: `${apiOptions.server}${path}`,
      method: "DELETE",
      json: {},
      qs: {},
    };
    request(
      requestOptions, // Opciones
      (err, response, body) => {
        if (err) {
          console.log(err);
        } else if (response.statusCode === 204) {
          //además del statusCode, el objeto resultante debe tener contenido
          console.log("REMOVED");
          res.redirect(`/admin/listado-ingredientes`);
        } else {
          //en caso de error, se hará render de una vista para el manejo de errores
          console.log(response.statusCode);
        }
      }
    );
*/

};



module.exports = {
  //separador de módulos con una "COMA"
  adminListadoIngredientes,
  deleteIngrediente,
  getIngrediente,
  UpdateIngrediente
};


