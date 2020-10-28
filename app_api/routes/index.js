//requerir el modulo express y otros
const express = require("express");
const router = express.Router(); 

//const ctrlLocations = require('../controllers/locations');
//requerir controladores
const ctrlUsuarios = require("../controllers/usuarios");
const ctrlPizzas = require("../controllers/pizzas");
const ctrlIngredientes = require("../controllers/ingredientes");

const ctrlOtrosProductos = require("../controllers/otrosproductos");
const ctrlPedido = require("../controllers/pedido");
const ctrlDetallesOrden = require("../controllers/detallesOrden");
const ctrlHistorialPedidos = require("../controllers/historialpedidos");
const ctrlCantPizzas = require("../controllers/cantidadpizzas");
const ctrlCantOtrosProductos = require("../controllers/cantidadotrosproductos");

//definir rutas paara las acciones definidas para la colección users
// locations
router
  .route("/usuarios")

  .post(ctrlUsuarios.usuarioCreate) //crea un usuario
  .get(ctrlUsuarios.usuarioList); //enlista usuario

router
  .route("/usuarios/:usuarioid")

  .get(ctrlUsuarios.usuarioRead) //lee usuario específico por id
  .put(ctrlUsuarios.usuarioUpdate) //actualiza
  .delete(ctrlUsuarios.usuarioDelete); //elimina

router
  .route("/pizzas")
  .post(ctrlPizzas.pizzaCreate) //crea un usuario
  .get(ctrlPizzas.pizzaList); //enlista usuario

router
  .route("/pizzas/:pizzaid")

  .get(ctrlPizzas.pizzaRead) //lee usuario específico por id
  .put(ctrlPizzas.pizzaUpdate) //actualiza
  .delete(ctrlPizzas.pizzaDelete); //elimina

router

  .route("/ingredientes")
  .post(ctrlIngredientes.ingredienteCreate) //crea un usuario
  .get(ctrlIngredientes.ingredienteList); //enlista usuario

router

  .route("/ingredientes/:ingredienteid")

  .get(ctrlIngredientes.ingredienteRead) //lee usuario específico por id
  .put(ctrlIngredientes.ingredienteUpdate) //actualiza
  .delete(ctrlIngredientes.ingredienteDelete); //elimina

router

  .route("/otrosproductos")
  .post(ctrlOtrosProductos.otroProductoCreate) //crea un usuario
  .get(ctrlOtrosProductos.otroProductoList); //enlista usuario

router

  .route("/otrosproductos/:otroproductoid")

  .get(ctrlOtrosProductos.otroProductoRead) //lee usuario específico por id
  .put(ctrlOtrosProductos.otroProductoUpdate) //actualiza
  .delete(ctrlOtrosProductos.otroProductoDelete); //elimina

router

  .route("/pedido")
  .post(ctrlPedido.pedidoCreate) //crea un usuario
  .get(ctrlPedido.pedidoList); //enlista usuario

router

  .route("/pedido/:pedidoid")

  .get(ctrlPedido.pedidoRead) //lee usuario específico por id
  .put(ctrlPedido.pedidoUpdate) //actualiza
  .delete(ctrlPedido.pedidoDelete); //elimina

router

  .route("/detallesorden")
  .post(ctrlDetallesOrden.detallesOrdenCreate) //crea un usuario
  .get(ctrlDetallesOrden.detallesOrdenList); //enlista usuario

router

  .route("/detallesorden/:detallesordenid")

  .get(ctrlDetallesOrden.detallesOrdenRead) //lee usuario específico por id
  .put(ctrlDetallesOrden.detallesOrdenUpdate) //actualiza
  .delete(ctrlDetallesOrden.detallesOrdenDelete); //elimina

router

  .route("/historialpedidos")
  .post(ctrlHistorialPedidos.historialPedidosCreate) //crea un usuario
  .get(ctrlHistorialPedidos.historialPedidosList); //enlista usuario

router

  .route("/historialpedidos/:historialpedidoid")

  .get(ctrlHistorialPedidos.historialPedidosRead) //lee usuario específico por id
  .put(ctrlHistorialPedidos.historialPedidosUpdate) //actualiza
  .delete(ctrlHistorialPedidos.historialPedidosDelete); //elimina

router

  .route("/cantidadpizzas")
  .post(ctrlCantPizzas.cantPizzasCreate) //crea un usuario
  .get(ctrlCantPizzas.cantPizzasList); //enlista usuario

router

  .route("/cantidadpizzas/:cantidadpizzasid")

  .get(ctrlCantPizzas.cantPizzasRead) //lee usuario específico por id
  .put(ctrlCantPizzas.cantPizzasUpdate) //actualiza
  .delete(ctrlCantPizzas.cantPizzasDelete); //elimina

router

  .route("/cantidadotrosproductos")
  .post(ctrlCantOtrosProductos.cantOtrosProductosCreate) //crea un usuario
  .get(ctrlCantOtrosProductos.cantOtrosProductosList); //enlista usuario

router

  .route("/cantidadotrosproductos/:cantidadotrosproductosid")

  .get(ctrlCantOtrosProductos.cantOtrosProductosRead) //lee usuario específico por id
  .put(ctrlCantOtrosProductos.cantOtrosProductosUpdate) //actualiza
  .delete(ctrlCantOtrosProductos.cantOtrosProductosDelete); //elimina

module.exports = router;
