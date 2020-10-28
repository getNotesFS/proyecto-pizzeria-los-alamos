//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const cantidadPizzas = mongoose.model('cantidadPizzas');

//Controladores
const cantPizzasCreate = (req, res) => {
    cantidadPizzas.create({
        Cantidad: req.body.Cantidad,
        PrecioUnitario : req.body.PrecioUnitario,
        Pizza: req.body.Pizza, 
       
    },(err, objetoCantidadPizzas) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoCantidadPizzas);
        }
    });
};

const cantPizzasList = (req, res) => {
    cantidadPizzas //nombre del modelo
        .find()
        .exec((err, objetoCantidadPizzas)=>{
            if(!objetoCantidadPizzas){
                console.log(`no existen documentos en la coleccion: ${cantidadPizzas}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen Cantidad  Pizzas"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${cantidadPizzas}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${cantidadPizzas}`);
            res
                .status(200)    
                .json(objetoCantidadPizzas);
        });
};


const cantPizzasRead = (req, res) => {
    cantidadPizzas //nombre del modelo
        .findById(req.params.cantidadpizzasid)
        .exec((err, objetoCantidadPizzas)=>{
            if(!objetoCantidadPizzas){
                console.log(`Cantidad Pizza no encontrada con el id: ${req.params.cantidadpizzasid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Cantidad Pizza no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la pizza con el id: ${req.params.cantidadpizzasid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Cantidad pizza con el id: ${req.params.cantidadpizzasid}`);
            res
                .status(200)    
                .json(objetoCantidadPizzas);
        });
};

const cantPizzasUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Cantidad Pizza actualizado" });
};
const cantPizzasDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Cantidad Pizza eliminado" });
};


module.exports = {
    cantPizzasCreate,
    cantPizzasDelete,
    cantPizzasList,
    cantPizzasRead,
    cantPizzasUpdate
}