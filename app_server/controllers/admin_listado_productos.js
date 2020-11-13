/*Controladores */
//Llamado a request
const request = require("request");

// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://pro-web-pizza-la.herokuapp.com"; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}

 

//listado Pizzas
const adminListadoProductos = (req, res,) => {
      
  const path = `/api/pizzas`;

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
        console.log(body);
        //console.log(ingred);
        res.render("admin_listado_productos", {
          title: "Listado Pizzas",
          pizzaList: body
        });

      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);

        res.render("error", {
          // usamos la vista error.pug
          error: "Error ",
          tipo: " El Código de Usuario: ",
          codigo: req.params.pizzaid, // código de usuario con error
          mensaje: "No existe. Ingrese uno válido",
        });
      }
    }
  );
};




module.exports = {
  //separador de módulos con una "COMA"
  adminListadoProductos,
};
