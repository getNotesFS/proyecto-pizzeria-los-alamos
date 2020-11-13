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

//Listado Ingredientes
const adminNuevaPizza = (req, res) => {
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
        console.log(body);
        res.render("admin_nueva_pizza", {
          title: "Nueva Pizza",
          listaIngredientes: body,
        });
      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
        console.log(err);
      }
    }
  );
};

//listado Pizzas
const adminListadoProductos = (req, res) => {
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
        //además del statusCode, el objeto resultante debe tener contenido
        //console.log(body);
       // getIngrediente(req, res, body);
          var ingggs=[];
        for (var ingrediente in body) {
          console.log(ingrediente + ": " + body[ingrediente].Nombre); 
          for (var ing in body[ingrediente].Ingredientes) {
            console.log(ing + ": " + body[ingrediente].Ingredientes[ing]); 
            getIngrediente(req, res, body[ingrediente].Ingredientes[ing]);

          }
        }

        res.render("admin_listado_productos", {
          title: "Listado Productos",
          pizzaList: body,
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

//CONCATENAR INGREDIENTES
const getIngrediente = (req, res, idIng) => {
  console.log("===========GET ID INGREDIENTE");
  console.log("===========" + idIng);

  const path = `/api/ingredientes/${idIng}`;

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
        console.log(body.Nombre);
          return body.Nombre;
      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
      }
    }
  );
};

module.exports = {
  //separador de módulos con una "COMA"
  adminListadoProductos,
};
