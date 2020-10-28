/*AQUI VAN LAS RUTAS*/

const express = require('express');
const router = express.Router();

/*Importar controladores */

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/about');


/* Definir las rutas de mis páginas*/

/*1.- Locations*/

router.get('/', ctrlLocations.homeList);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

//RUTA AL LISTADO
/* GET User Info. */

router.get('/pizzas/:pizzaid', ctrlLocations.pizzaList); //modificado para usar la API REST

//FORM HERE
router.post('/pizza/new',ctrlLocations.addNewPizza);
router.get('/pizza/new',ctrlLocations.NewPizzaView);
  

/*2.- About*/
router.get('/about', ctrlOthers.about);

module.exports = router;

 

