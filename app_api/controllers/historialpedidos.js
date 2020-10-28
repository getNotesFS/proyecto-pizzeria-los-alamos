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
        .find({
            'id' : '5f8522bd389d591a64b9f74e'
        })
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
    res
        .status(200)
        .json({ "status": "Historial Pedidos actualizado" });
};
const historialPedidosDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Historial Pedidos eliminado" });
};


module.exports = {
    historialPedidosCreate,
    historialPedidosDelete,
    historialPedidosList,
    historialPedidosRead,
    historialPedidosUpdate
}