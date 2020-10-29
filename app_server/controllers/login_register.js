 
  /*GET -> MENU*/

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
      request(requestOptions, (err, { statusCode }, { name }, body) => {
        console.log("Aqui voy");
        if (statusCode === 201) {
          //HTTP response status 201 : Creado exitoso
          /* res.redirect("/pizza/new");*/
          console.log("Ha recibido");
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
  };


    module.exports =  {
        //separador de módulos con una "COMA"
        loginRegister,
        addNewRegister
  
    }