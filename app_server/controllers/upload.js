 
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
    
  }
  
  /*GET -> About*/
  const uploadFile = (req, res) => {

     
    axios
    .put(`${apiOptions.server}/api/upload`, {
      
        imagen: req.body.iagen, 
    })
    .then(function () {
       
        console.log("error");
    });
  }
  const upload = (req, res) => {

    res.render('upload', { title: 'UPLOAD' });

  }
  
    module.exports =  {
        //separador de módulos con una "COMA"
        upload,
        uploadFile
  
    }