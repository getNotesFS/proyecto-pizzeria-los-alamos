//usar mongoose y el modelo compilado para acceder a la base de datos
const mongoose = require('mongoose');
const otrosProductos = mongoose.model('otroProducto');

//Controladores
const otroProductoCreate = (req, res) => {
    otrosProductos.create({
        Nombre: req.body.Nombre,
        Tipo: req.body.Tipo,
        Descripcion: req.body.Descripcion,
        Stock: req.body.Stock,
        Cantidad: req.body.Cantidad,
        Precio: req.body.Precio,
        Imagen : req.body.Imagen,
       
    },(err, objetoOtrosProductos) =>{
        if(err){
            res.status(400).json(err);
        } else {
            res.status(201).json(objetoOtrosProductos);
        }
    });
};

const otroProductoList = (req, res) => {
    otrosProductos //nombre del modelo
        .find()
        .exec((err, objetoOtrosProductos)=>{
            if(!objetoOtrosProductos){
                console.log(`no existen documentos en la coleccion: ${otrosProductos}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "No existen otrosProductos"
                    });
            } else if(err){
                console.log(`Se encontro un error en la coleccion: ${otrosProductos}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontraron documentos en la coleccion ${otrosProductos}`);
            res
                .status(200)    
                .json(objetoOtrosProductos);
        });
};


const otroProductoRead = (req, res) => {
    otrosProductos //nombre del modelo
        .findById(req.params.otroproductoid)
        .exec((err, objetoOtrosProductos)=>{
            if(!objetoOtrosProductos){
                console.log(`Otro Producto no encontrada con el id: ${req.params.otroproductoid}`);
                return res
                    .status(404)
                    .json({
                        "Mensaje ": "Otro Producto no encontrado"
                    });
            } else if(err){
                console.log(`Se encontro un error en la Otro Producto con el id: ${req.params.otroproductoid}`);
                return res
                    .status(404)
                    .json(err);
            }
            console.log(`Se encontro el documento Otro Producto con el id: ${req.params.otroproductoid}`);
            res
                .status(200)    
                .json(objetoOtrosProductos);
        });
};

const otroProductoUpdate = (req, res) => {
    if(!req.params.otroproductoid){
        return res  
                .status(404)
                .json({"Mensaje" : "El ID OtroProducto ingresado no existe, ingrese un ID OTROPRODUCTO válido."});
    } 
    
    otrosProductos
        .findById(req.params.otroproductoid)
        .exec((err, objetoOtrosProductos)=>{

            if(!objetoOtrosProductos){
                return res  
                    .status(404)
                    .json({"Mensaje" : "El ID Otro no encontrado."});
            }
            objetoOtrosProductos.Nombre = req.body.Nombre; 
            objetoOtrosProductos.Tipo = req.body.Tipo; 
            objetoOtrosProductos.Descripcion = req.body.Descripcion; 
            objetoOtrosProductos.Stock = req.body.Stock; 
            objetoOtrosProductos.Cantidad = req.body.Cantidad; 
            objetoOtrosProductos.Precio = req.body.Precio; 
            objetoOtrosProductos.Imagen = req.body.Imagen; 
            
            objetoOtrosProductos.save((err, objetoOtrosProducto)=>{
                if(err){
                    res
                        .status(404)
                        .json(err);
                }else{
                    res
                        .status(200)
                        .json(objetoOtrosProducto);
                }
            });
        });
};
const otroProductoDelete = (req, res) => {
    if (req.params.otroproductoid) {
        otrosProductos
            .findByIdAndDelete(req.params.otroproductoid)
            .exec((err, objetoOtrosProductos) => {
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
            .json({ "Mensaje": "OtrosProductos no encontrado" });
    }
};


module.exports = {
    otroProductoCreate,
    otroProductoDelete,
    otroProductoList,
    otroProductoRead,
    otroProductoUpdate
}