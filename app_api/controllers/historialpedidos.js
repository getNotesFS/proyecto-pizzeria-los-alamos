//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const historialPedidos = mongoose.model('historialPedidos');

//Controladores
const historialPedidosCreate = (req, res) => {
    historialPedidos.create({
        Pedido: [req.body.Pedido]
       
    },(err, objetoHistorialPedidos) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoHistorialPedidos);
        }
    });
};

const historialPedidosList = (req, res) => {
    historialPedidos //nombre del modelo
        .find()
        .exec((err, objetoHistorialPedidos)=>{
            if(!objetoHistorialPedidos){
                console.log(`no existen documentos en la coleccion: ${historialPedidos}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen historial pedido"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${historialPedidos}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${historialPedidos}`);
            res
                .status(200)    
                .json(objetoHistorialPedidos);
        });
};


const historialPedidosRead = (req, res) => {
    historialPedidos //nombre del modelo
        .findById(req.params.historialpedidoid)
        .exec((err, objetoHistorialPedidos)=>{
            if(!objetoHistorialPedidos){
                console.log(`Historial Pedido no encontrada con el id: ${req.params.historialpedidoid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Historial Pedido no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la Historial Pedido con el id: ${req.params.historialpedidoid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Historial Pedido con el id: ${req.params.historialpedidoid}`);
            res
                .status(200)    
                .json(objetoHistorialPedidos);
        });
};

const historialPedidosUpdate = (req, res) => {
    if(!req.params.historialpedidoid){
        return res  
                .status(404)
                .json({"Mensaje" : "El ID HistorialPedidos ingresado no existe, ingrese un ID HISTORIALPEDIDOS válido."});
    } 
    
        historialPedidos
        .findById(req.params.historialpedidoid)
        .exec((err, objetoHistorialPedidos)=>{

            if(!objetoHistorialPedidos){
                return res  
                    .status(404)
                    .json({"Mensaje" : "El ID HistorialPedido no encontrado."});
            }
            objetoHistorialPedidos.Pedido = [req.body.Pedido];
            objetoHistorialPedidos.save((err, objetoHistorialPedidos)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                }else{
                    res
                        .status(200)
                        .json(objetoHistorialPedidos);
                }
            });
        });
};
const historialPedidosDelete = (req, res) => {
    if (req.params.historialpedidoid) {
        pizzas
            .findByIdAndDelete(req.params.historialpedidoid)
            .exec((err, objetoHistorialPedidos) => {
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
            .json({ "Mensaje": "HistoriaPedidos no encontrado" });
    }
};


module.exports = {
    historialPedidosCreate,
    historialPedidosDelete,
    historialPedidosList,
    historialPedidosRead,
    historialPedidosUpdate
}