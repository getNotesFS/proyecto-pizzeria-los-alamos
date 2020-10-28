//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const cantidadOtrosProductos = mongoose.model('cantidadOtrosProductos');

//Controladores
const cantOtrosProductosCreate = (req, res) => {
    cantidadOtrosProductos.create({
        Cantidad: req.body.Cantidad,
        OtroProducto : req.body.OtroProducto, 
       
    },(err, objetoCantidadOtrosProductos) =>{
        if(err){
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(objetoCantidadOtrosProductos);
        }
    });
};

const cantOtrosProductosList = (req, res) => {
    cantidadOtrosProductos //nombre del modelo
        .find()
        .exec((err, objetoCantidadOtrosProductos)=>{
            if(!objetoCantidadOtrosProductos){
                console.log(`no existen documentos en la coleccion: ${cantidadOtrosProductos}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen pizza"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${cantidadOtrosProductos}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${cantidadOtrosProductos}`);
            res
                .status(200)    
                .json(objetoCantidadOtrosProductos);
        });
};


const cantOtrosProductosRead = (req, res) => {
    cantidadOtrosProductos //nombre del modelo
        .findById(req.params.cantidadotrosproductosid)
        .exec((err, objetoCantidadOtrosProductos)=>{
            if(!objetoCantidadOtrosProductos){
                console.log(`Cantidad Otro Producto no encontrada con el id: ${req.params.cantidadotrosproductosid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Cantidad Otro Producto no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la Cantidad Otro Producto con el id: ${req.params.cantidadotrosproductosid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Cantidad Otro Producto con el id: ${req.params.cantidadotrosproductosid}`);
            res
                .status(200)    
                .json(objetoCantidadOtrosProductos);
        });
};

const cantOtrosProductosUpdate = (req, res) => {
    res
        .status(200)
        .json({ "status": "Cantidad Otros Productos actualizado" });
};
const cantOtrosProductosDelete = (req, res) => {
    res
        .status(200)
        .json({ "status": "Cantidad Otros Productos eliminado" });
};


module.exports = {
    cantOtrosProductosCreate,
    cantOtrosProductosDelete,
    cantOtrosProductosList,
    cantOtrosProductosRead,
    cantOtrosProductosUpdate
}