/*Controladores para la Collection Locations*/
//Llamado a request
const request = require("request");
 

// Definir las URLs para los ambientes de desarrollo y producción

const apiOptions = {
  server: "http://localhost:3000", //servidor local - desarrollo
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pro-web-pizza-la.herokuapp.com/'; //servidor remoto - producción
  console.log("=========================HA LLEGADO A PRODUCCION");
}

/*GET -> Mi Homepage*/
const homeList = (req, res) => {
  res.render("index", {
    title: "Add New Pizza",
    error: req.query.err,
    nombre: "Pizza Criolla",
    descripcion: "Descipcion de la pizza",
    categoria: "no vegana",
    tipomasa: "true",
    tamanio: "Grande",
    precio: "22",
    imagen: "pizza_criolla_img",
    ingredientes: "5f84ac2280986513c4e7d193",
  });
};



const pizzaList = (req, res) => {
  const path = `api/pizzas/${req.params.pizzaid}`;
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
      // callback con sus 3 partes: err, response, body
      // err - objeto con el error,
      // response - respuesta completa (incluye status),
      // body - cuerpo de la respuesta
      if (err) {
        console.log(err);
      } else if (response.statusCode === 200 && body) {
        //además del statusCode, el objeto resultante debe tener contenido
        console.log(body);

        renderHomepage(req, res, body); //lamo a mi función que hace render de la vista
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

// usar la API REST para cargar información en mi "homelist"
const renderHomepage = (req, res, responseBody) => {
  res.render("index", {
    title: "Pagina de Inicio",
    nombre: responseBody.Nombre,
    descripcion: responseBody.Descripcion,
    categoria: responseBody.Categoria,
    tipomasa: responseBody.TipoMasa,
    tamanio: responseBody.Tamanio,
    precio: responseBody.Precio,
    imagen: responseBody.Imagen,
    ingredientes: responseBody.Ingredientes,
  });
};

//ERRORES
//SHOR ERROR
const showError = (req, res, status) => {
  let title = "";
  let content = "";
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like you can't find this page. Sorry.";
  } else {
    title = `${status}, something's gone wrong`;
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render("generic-text", {
    title,
    content,
  });
};

/* add */
const addNewPizza = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  const path = "api/pizzas";
  const postdata = {
    Nombre: req.body.nombre,
    Descripcion: req.body.descripcion,
    Categoria: req.body.categoria,
    TipoMasa: req.body.tipomasa,
    Tamanio: req.body.tamanio,
    Precio: parseFloat(req.body.precio),
    Imagen: req.body.imagen,
    Ingredientes: req.body.ingredientes,
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
    request(requestOptions, (err, { statusCode }, { name }, body) => {
      console.log("Aqui voy");
      if (statusCode === 201) {
        //HTTP response status 201 : Creado exitoso
        /* res.redirect("/pizza/new");*/
        console.log("Ha recibido");
        res.render("new_pizza", {
          title: "Add New Pizza",
          mensaje: "Se ha agrergado un nuevo producto",
        });
      } else if (statusCode === 400 && name && name === "ValidationError") {
        res.redirect("/pizza/new?err=val");
        //FORMATO DEBE SER ASÍ SI EL ADD NEW ESTÁ EN UN PATH INDEPENDIENTE
        //res.redirect("/pizza/new?err=val");
        console.log(body);
      } else {
        showError(req, res, statusCode);
        console.log(err);
      }
    });
 // }
};

/*GET -> IMPRIME FORMULARIO*/
const NewPizzaView = (req, res) => {
  res.render("new_pizza", {
    title: "Add New Pizza",
    error: req.query.err,
  });
};

/*GET -> Location Information*/

const locationInfo = (req, res) => {
  res.render("index", { title: "Location Information" });
};

/*GET -> Add Reviews*/

const addReview = (req, res) => {
  res.render("index", { title: "Add Reviews" });
};

module.exports = {
  //separador de módulos con una "COMA"
  pizzaList,
  homeList,
  locationInfo,
  addReview,
  addNewPizza,
  NewPizzaView,
};
