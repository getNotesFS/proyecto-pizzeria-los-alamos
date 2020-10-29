 

  const adminNuevaPizza = (req, res) => {
    res.render('admin_nueva_pizza', { title: 'Nueva Pizza' });
  }


  const addNuevaPizza = (req, res) => {
    console.log("Llegaron los datos");
    console.log(req.body);
  
    const path = "api/pizzasNueva";
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


    request(requestOptions, (err, { statusCode }, { name }, body) => {
      console.log("Aqui voy");
      if (statusCode === 201) {
        //HTTP response status 201 : Creado exitoso
        /* res.redirect("/pizza/new");*/
        console.log("Ha recibido");
        res.render("admin_nueva_pizza", {
          title: "Add New Pizza",
          mensaje: "Se ha agrergado un nuevo ingrediente",
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

  
    module.exports =  {
        //separador de módulos con una "COMA"
        adminNuevaPizza,
        addNuevaPizza
  
    }