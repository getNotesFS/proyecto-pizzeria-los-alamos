//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const pedidos = mongoose.model('pedido');

//Controladores
const pedidoCreate = (req, res) => {
    pedidos.create({ 
        DetallesOrden: req.body.DetallesOrden,
        Usuario : req.body.Usuario,
        Fecha: req.body.Fecha,
        Total: req.body.Total,
        SubTotal: req.body.SubTotal,
       
    },(err, objetoPedido) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoPedido);
        }
    });
};

const pedidoList = (req, res) => {
    pedidos //nombre del modelo
        .find()
        .exec((err, objetoPedido)=>{
            if(!objetoPedido){
                console.log(`no existen documentos en la coleccion: ${pedidos}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen pedido"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${pedidos}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${pedidos}`);
            res
                .status(200)    
                .json(objetoPedido);
        });
};


const pedidoRead = (req, res) => {
    pedidos //nombre del modelo
        .findById(req.params.pedidoid)
        .exec((err, objetoPedido)=>{
            if(!objetoPedido){
                console.log(`Pedido no encontrada con el id: ${req.params.pedidoid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Pedido no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la Pedido con el id: ${req.params.pedidoid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Pedido con el id: ${req.params.pedidoid}`);
            res
                .status(200)    
                .json(objetoPedido);
        });
};

const pedidoUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Pedido actualizado" });
};
const pedidoDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Pedido eliminado" });
};


module.exports = {
    pedidoCreate,
    pedidoDelete,
    pedidoList,
    pedidoRead,
    pedidoUpdate
}