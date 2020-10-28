//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require("mongoose");
const pizzas = mongoose.model("pizza"); 

//Controladores
const pizzaCreate = (req, res) =>{

    //console.log(req.body.Ingredientes);
    pizzas.create({
        Nombre: req.body.Nombre,
        Descripcion : req.body.Descripcion,
        Categoria: req.body.Categoria,
        TipoMasa: req.body.TipoMasa,
        Tamanio: req.body.Tamanio,
        Precio: req.body.Precio,
        Imagen: req.body.Imagen,
        Ingredientes: req.body.Ingredientes
       
    },(err, objetoPizza) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoPizza);
        }
    });
}

const pizzaList = (req, res) => {
    pizzas //nombre del modelo
        .find({
            'Nombre' : 'peperonni'
        })
        .exec((err, objetoPizza)=>{
            if(!objetoPizza){
                console.log(`no existen documentos en la coleccion: ${pizzas}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen pizza"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${pizzas}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${pizzas}`);
            res
                .status(200)    
                .json(objetoPizza);
        });
};






const pizzaRead = (req, res) => {
    pizzas //nombre del modelo
        .findById(req.params.pizzaid)
        .exec((err, objetoPizza)=>{
            if(!objetoPizza){
                console.log(`Pizza no encontrada con el id: ${req.params.pizzaid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Pizza no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la pizza con el id: ${req.params.pizzaid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento pizza con el id: ${req.params.pizzaid}`);
            res
                .status(200)    
                .json(objetoPizza);
        });
};
const pizzaUpdate = (req, res) => {
    if(!req.params.pizzaid){
        return res  
                .status(404)
                .json({"Mensaje" : "El ID Pizza ingresado no existe, ingrese un ID PIZZA válido."});
    } 
    
        pizzas
        .findById(req.params.pizzaid)
        .exec((err, objetoPizza)=>{

            if(!objetoPizza){
                return res  
                    .status(404)
                    .json({"Mensaje" : "El ID Pizza no encontrado."});
            }
            objetoPizza.Nombre = req.body.Nombre; 
            objetoPizza.Descripcion = req.body.Descripcion;
            objetoPizza.Categoria = req.body.Categoria;
            objetoPizza.TipoMasa = req.body.TipoMasa;
            objetoPizza.Tamanio = req.body.Tamanio;
            objetoPizza.Precio = req.body.Precio;
            objetoPizza.Imagen = req.body.Imagen;
            objetoPizza.Ingredientes = [req.body.Ingredientes];
            objetoPizza.save((err, Pizzas)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                }else{
                    res
                        .status(200)
                        .json(Pizzas);
                }
            });
        });
     
 
};

const pizzaDelete = (req, res) => {
  //res.status(200).json({ status: "Pizza eliminado" });

    if (req.params.pizzaid) {
        pizzas
            .findByIdAndDelete(req.params.pizzaid)
            .exec((err, objetoPizza) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({ "Mensaje": "Pizza no encontrado" });
    }
};



 


module.exports = {
  pizzaCreate,
  pizzaDelete,
  pizzaList,
  pizzaRead,
  pizzaUpdate,
};
