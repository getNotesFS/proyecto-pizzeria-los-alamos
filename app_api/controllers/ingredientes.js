//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const ingredientes = mongoose.model('ingredientes');

//Controladores
const ingredienteCreate = (req, res) => {
    ingredientes.create({
        Nombre: req.body.Nombre,
        Imagen: req.body.Imagen,
        Precio: req.body.Precio
    },(err, objetoIngrediente) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoIngrediente);
        }
    });

};

const ingredienteList = (req, res) => {
    ingredientes //nombre del modelo
    .find({
        'Nombre' : 'champiniones'
    })
    .exec((err, objetoIngrediente)=>{
        if(!objetoIngrediente){
            console.log(`no existen documentos en la coleccion: ${ingredientes}`);
            return res
                .status(404)
                .json({
                    "Mensaje ": "No existen ingrediente"
                });
        } else if(err){
            console.log(`Se encontro un error en la coleccion: ${ingredientes}`);
            return res
                .status(404)
                .json(err);
        }
        console.log(`Se encontraron documentos en la coleccion ${ingredientes}`);
        res
            .status(200)    
            .json(objetoIngrediente);
    });
};


const ingredienteRead = (req, res) => {
    ingredientes //nombre del modelo
    .findById(req.params.ingredienteid)
    .exec((err, objetoIngrediente)=>{
        if(!objetoIngrediente){
            console.log(`ingrediente no encontrada con el id: ${req.params.ingredienteid}`);
            return res
                .status(404)
                .json({
                    "Mensaje ": "ingrediente no encontrado"
                });
        } else if(err){
            console.log(`Se encontro un error en la ingrediente con el id: ${req.params.ingredienteid}`);
            return res
                .status(404)
                .json(err);
        }
        console.log(`Se encontro el documento ingrediente con el id: ${req.params.ingredienteid}`);
        res
            .status(200)    
            .json(objetoIngrediente);
    });
};

const ingredienteUpdate = (req, res) => {
    if(!req.params.ingredienteid){
        return res  
                .status(404)
                .json({"Mensaje" : "El ID Ingrediente ingresado no existe, ingrese un ID INGREDIENTE válido."});
    } 
    
        ingredientes
        .findById(req.params.ingredienteid)
        .exec((err, objetoIngrediente)=>{

            if(!objetoIngrediente){
                return res  
                    .status(404)
                    .json({"Mensaje" : "El ID Ingrediente no encontrado."});
            }
            objetoIngrediente.Nombre = req.body.Nombre;
            objetoIngrediente.Imagen = req.body.Imagen;
            objetoIngrediente.Precio = req.body.Precio; 
            objetoPizza.save((err, objetoIngrediente)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                }else{
                    res
                        .status(200)
                        .json(objetoIngrediente);
                }
            });
        });
     
};
const ingredienteDelete = (req, res) => {
    if (req.params.ingredienteid) {
        pizzas
            .findByIdAndDelete(req.params.ingredienteid)
            .exec((err, objetoIngrediente) => {
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
            .json({ "Mensaje": "Ingredientes no encontrado" });
    }
};


module.exports = {
    ingredienteCreate,
    ingredienteDelete,
    ingredienteList,
    ingredienteRead,
    ingredienteUpdate
}