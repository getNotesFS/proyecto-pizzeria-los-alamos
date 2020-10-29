/*AQUI VAN LAS RUTAS*/

const express = require('express');
const router = express.Router();

/*Importar controladores */

const ctrlLocations = require('../controllers/locations'); 
const ctrlHomepage = require('../controllers/homepage');
const ctrlAbout = require('../controllers/about');
const ctrlContact = require('../controllers/contact');
const ctrlCart= require('../controllers/cart');
const ctrlMenu= require('../controllers/menu');
const ctrlProduct= require('../controllers/single-product');
const ctrlOfferts= require('../controllers/offerts');
const ctrlLoginRegister= require('../controllers/login_register');

const ctrlAdminIndex = require('../controllers/admin_index');
const ctrlAdminListadoProductos = require('../controllers/admin_listado_productos');
const ctrlAdminNuevaPizza = require('../controllers/admin_nueva_pizza');
const ctrlAdminNuevoIngrediente = require('../controllers/admin_nuevo_ingrediente');




/* Definir las rutas de mis páginas*/

 
/*1.- home*/

router.get('/', ctrlHomepage.homepage);
 
/*2.- About*/
router.get('/about', ctrlAbout.about);

/*3.- Contact*/
router.get('/contact', ctrlContact.contact);

/*34.- Menu*/
router.get('/menu', ctrlMenu.menu);

/*34.- Offerts*/
router.get('/offerts', ctrlOfferts.offerts);
 
/*34.- Single Product*/
router.get('/product', ctrlProduct.product);


/*34.- Single Product*/
router.get('/login-register', ctrlLoginRegister.loginRegister);
 
/*7.- Checkout*/
router.get('/cart', ctrlCart.cart);
router.get('/checkout', ctrlCart.checkout); 
router.get('/order-complete', ctrlCart.ordercomplete);


router.get('/admin', ctrlAdminIndex.adminIndex);
router.get('/admin/nueva-pizza', ctrlAdminNuevaPizza.adminNuevaPizza);
router.get('/admin/nuevo-ingrediente', ctrlAdminNuevoIngrediente.adminNuevoIngrediente);
router.get('/admin/listado-productos', ctrlAdminListadoProductos.adminListadoProductos);


/*
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

*/
//RUTA AL LISTADO
/* GET User Info. */

router.get('/pizzas/:pizzaid', ctrlLocations.pizzaList); //modificado para usar la API REST

//FORM HERE

router.get('/pizza/new',ctrlLocations.NewPizzaView);
router.post('/pizza/new',ctrlLocations.addNewPizza);
  

 





module.exports = router;

 

