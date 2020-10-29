 

  const adminNuevoIngrediente = (req, res) => {
    res.render('admin_nuevo_ingrediente', { title: 'Listado Productos' });
  }

  const addNewIngrediente = (req, res) => {
    console.log("Llegaron los datos");
    console.log(req.body);
  
    const path = "api/ingredientes";
    const postdata = {
      Nombre: req.body.nombre,
      Imagen: req.body.imagen,
      Precio: req.body.precio,
    };
  
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: "POST",
      json: postdata,
    };


    request(requestOptions, (err, { statusCode }, { name }, body) => {
      console.log("Aqui voy");
      if (statusCode === 201) {
        //HTTP response status 201 : Creado exitoso
        /* res.redirect("/pizza/new");*/
        console.log("Ha recibido");
        res.render("admin_nuevo_ingrediente", {
          title: "Add New Ingrediente",
          mensaje: "Se ha agrergado un nuevo ingrediente",
        });
      } else if (statusCode === 400 && name && name === "ValidationError") {
        res.redirect("/admin_nuevo_ingrediente?err=val");
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
  
  
    module.exports =  {
        //separador de módulos con una "COMA"
        adminNuevoIngrediente,
        addNewIngrediente
    }