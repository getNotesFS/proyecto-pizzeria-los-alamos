//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const detallesOrdenes = mongoose.model('detallesOrden');

//Controladores
const detallesOrdenCreate = (req, res) => {
    detallesOrdenes.create({ 
        CantidadPizzas: [req.body.CantidadPizzas],
        CantidadOtrosProductos: [req.body.CantidadOtrosProductos]
       
    },(err, objetoDetallesOrdenes) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoDetallesOrdenes);
        }
    });
};

const detallesOrdenList = (req, res) => {
    detallesOrdenes //nombre del modelo
        .find()
        .exec((err, objetoDetallesOrdenes)=>{
            if(!objetoDetallesOrdenes){
                console.log(`no existen documentos en la coleccion: ${detallesOrdenes}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen Detalles Orden"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${detallesOrdenes}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${detallesOrdenes}`);
            res
                .status(200)    
                .json(objetoDetallesOrdenes);
        });
};


const detallesOrdenRead = (req, res) => {
    detallesOrdenes //nombre del modelo
        .findById(req.params.detallesordenid)
        .exec((err, objetoDetallesOrdenes)=>{
            if(!objetoDetallesOrdenes){
                console.log(`Detalles Orden no encontrada con el id: ${req.params.detallesordenid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Detalles Orden no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la Detalles Orden con el id: ${req.params.detallesordenid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Detalles Orden con el id: ${req.params.detallesordenid}`);
            res
                .status(200)    
                .json(objetoDetallesOrdenes);
        });
};

const detallesOrdenUpdate = (req, res) => {
    if(!req.params.detallesordenid){
        return res  
                .status(404)
                .json({"Mensaje" : "El ID DetalleOrden ingresado no existe, ingrese un ID DETALLEORDEN válido."});
    } 
    
        pizzas
        .findById(req.params.detallesordenid)
        .exec((err, objetoDetallesOrdenes)=>{

            if(!objetoDetallesOrdenes){
                return res  
                    .status(404)
                    .json({"Mensaje" : "El ID DetalleOrden no encontrado."});
            }
            objetoDetallesOrdenes.CantidadPizzas = [req.body.CantidadPizzas];
            objetoDetallesOrdenes.CantidadOtrosProductos = [req.body.CantidadOtrosProductos];
            objetoDetallesOrdenes.save((err, objetoDetallesOrdenes)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                }else{
                    res
                        .status(200)
                        .json(objetoDetallesOrdenes);
                }
            });
        });
};
const detallesOrdenDelete = (req, res) => {
    if (req.params.detallesordenid) {
        pizzas
            .findByIdAndDelete(req.params.detallesordenid)
            .exec((err, objetoDetallesOrdenes) => {
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
            .json({ "Mensaje": "DetalleOrden no encontrado" });
    }
};


module.exports = {
    detallesOrdenCreate,
    detallesOrdenDelete,
    detallesOrdenList,
    detallesOrdenRead,
    detallesOrdenUpdate
}