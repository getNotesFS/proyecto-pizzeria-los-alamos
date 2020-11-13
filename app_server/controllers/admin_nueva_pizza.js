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

//GET INGREDIENTES
 

//PRINT VIEW NEW PIZZA
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
          listaIngredientes: body
        });
      } else {
        //en caso de error, se hará render de una vista para el manejo de errores
        console.log(response.statusCode);
        console.log(err);
      }
    }
  );
 
};
//ADD PIZZA

const addNuevaPizza = (req, res) => {
  console.log("Llegaron los datos");
  console.log(req.body);

  const path = "/api/pizzas";
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
      res.render("admin_nueva_pizza", {
        title: "Add New Pizza",
        mensaje: "Se ha agrergado un nuevo producto",
      });
    } else if (statusCode === 400 && name && name === "ValidationError") {
      res.redirect("/admin/nueva-pizza?err=val");
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

module.exports = {
  //separador de módulos con una "COMA"
  adminNuevaPizza,
  addNuevaPizza,
};
