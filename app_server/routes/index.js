/*AQUI VAN LAS RUTAS*/

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
 
/*Importar controladores */ 
const expressFileUpload = require('express-fileupload');
router.use( expressFileUpload() );
//router.use( expressFileUpload() );

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
const ctrlAdminListadoIngredientes = require('../controllers/admin_listado_ingredientes');

const ctrlAdminNuevaPizza = require('../controllers/admin_nueva_pizza');
const ctrlAdminNuevoIngrediente = require('../controllers/admin_nuevo_ingrediente');

//usuarios
const ctrlAdminListadoUsuarios = require('../controllers/admin_listado_usuarios');
const ctrlAdminNuevoUsuario = require('../controllers/admin_nuevo_usuario');
const ctrlMyAccount = require('../controllers/my_account');

const ctrlUpload = require('../controllers/upload');

//otro producto
const ctrlAdminListadoOtroProducto = require('../controllers/admin_listado_otroproducto');
const ctrlAdminNuevoOtroProducto = require('../controllers/admin_nuevo_otroproducto');

//ofertas
const ctrlAdminListadoOfertas = require('../controllers/admin_listado_ofertas');
const ctrlAdminNuevoOferta = require('../controllers/admin_nuevo_ofertas');
const ctrlAdminListadoPedidos = require('../controllers/admin_listado_pedidos');

 
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
 
router.get('/upload', ctrlUpload.upload);
router.post('/upload_file', ctrlUpload.uploadFile);


/*34.- Single Product*/
router.get('/product', ctrlProduct.product);
router.get('/product/:_id', ctrlProduct.singleProduct);//VIEW

/*MY ACCOUNT */
router.get('/my-account',  ctrlMyAccount.myAccountView);//VIEW
router.get('/my-account/perfil', ctrlMyAccount.myAccountPerfilView);//VIEW
router.get('/my-account/pedidos', ctrlMyAccount.myAccountPedidosView);//VIEW
//router.get('/my-account/direcciones', ctrlMyAccount.myAccountView);//VIEW
router.get('/my-account/perfil/:_id', ctrlMyAccount.editUsuarioView); //VIEW
router.post('/my-account/perfil/:_id',ctrlMyAccount.UpdateUsuario);



/*LOGIN REGISTER */

router.get('/login-register', ctrlLoginRegister.loginRegister);//VIEW
router.post('/register-f', ctrlLoginRegister.addNewUsuario);

router.post('/login-register/login', ctrlLoginRegister.login);//VIEW
/*7.- Checkout*/
router.get('/cart', ctrlCart.cart);
router.get('/checkout', ctrlCart.checkout); 
router.get('/order-complete', ctrlCart.ordercomplete);


router.get('/admin', ctrlAdminIndex.adminIndex);

//=PIZZAS
router.get('/admin/nueva-pizza', ctrlAdminNuevaPizza.adminNuevaPizzaView);//VIEW
router.post('/admin/nueva-pizza', ctrlAdminNuevaPizza.addNuevaPizza);
router.get('/admin/listado-productos', ctrlAdminListadoProductos.adminListadoProductos);
router.get('/admin/editar-pizza/:_id', ctrlAdminNuevaPizza.editPizzaView);//VIEW
router.post('/admin/editar-pizza/:_id', ctrlAdminNuevaPizza.updatePizza);
//deleteIngrediente
router.get('/admin/pizzas/delete/:_id',ctrlAdminListadoProductos.deletePizza);


//=INGREDIENTES
router.get('/admin/nuevo-ingrediente', ctrlAdminNuevoIngrediente.adminNuevoIngredienteView);//VIEW
router.post('/admin/nuevo-ingrediente', ctrlAdminNuevoIngrediente.addNewIngrediente);
router.get('/admin/editar-ingrediente/:_id', ctrlAdminNuevoIngrediente.editIngredienteView); //VIEW
router.post('/admin/editar-ingrediente/:_id',ctrlAdminNuevoIngrediente.UpdateIngrediente);
router.get('/admin/listado-ingredientes', ctrlAdminListadoIngredientes.adminListadoIngredientes);

//deleteIngrediente
router.get('/admin/ingredientes/delete/:_id',ctrlAdminListadoIngredientes.deleteIngrediente);
 
 
router.get('/pizzas/:pizzaid', ctrlLocations.pizzaList); //modificado para usar la API REST

//Otro Producto
router.get('/admin/nuevo-otroproducto', ctrlAdminNuevoOtroProducto.adminNuevoOtroProductoView);//VIEW
router.post('/admin/nuevo-otroproducto', ctrlAdminNuevoOtroProducto.addNewOtroProducto);

router.get('/admin/editar-otroproducto/:_id', ctrlAdminNuevoOtroProducto.editOtroProductoView); //VIEW
router.post('/admin/editar-otroproducto/:_id',ctrlAdminNuevoOtroProducto.UpdateOtroProducto);
router.get('/admin/listado-otroproducto', ctrlAdminListadoOtroProducto.adminListadoOtroProductos);
router.get('/admin/otrosproductos/delete/:_id',ctrlAdminListadoOtroProducto.deleteOtrosProductos);



//Ofertas
router.get('/admin/nuevo-oferta', ctrlAdminNuevoOferta.adminNuevoOfertaView);//VIEW
router.post('/admin/nuevo-oferta', ctrlAdminNuevoOferta.addNewOferta);

router.get('/admin/editar-oferta/:_id', ctrlAdminNuevoOferta.editOfertaView); //VIEW
router.post('/admin/editar-oferta/:_id',ctrlAdminNuevoOferta.UpdateOferta);
router.get('/admin/listado-oferta', ctrlAdminListadoOfertas.adminListadoOferta);
router.get('/admin/oferta/delete/:_id',ctrlAdminListadoOfertas.deleteOferta);


//PEDIDOS
router.get('/admin/listado-pedidos',ctrlAdminListadoPedidos.adminListadoPedidos);
router.get('/admin/pedidos/delete/:_id',ctrlAdminListadoPedidos.deletePedido);


//usuarios
router.get('/admin/nuevo-usuario', ctrlAdminNuevoUsuario.adminNuevoUsuarioView);//VIEW
router.post('/admin/nuevo-usuario', ctrlAdminNuevoUsuario.addNewUsuario);

router.get('/admin/editar-usuario/:_id', ctrlAdminNuevoUsuario.editUsuarioView); //VIEW
router.post('/admin/editar-usuario/:_id',ctrlAdminNuevoUsuario.UpdateUsuario);
router.get('/admin/listado-usuarios', ctrlAdminListadoUsuarios.adminListadoUsuarios);
router.get('/admin/usuarios/delete/:_id',ctrlAdminListadoUsuarios.deleteUsuario);

//Email
router.post('/email', async (req, res) =>{
    //console.log(req.body);
    const {name, apellido, email, asunto, mensaje } = req.body;

    contentHTML = `
        <h1> User Informacion </h1>
        <ul>
            <li>Usuario: ${name} ${apellido} </li>
            <li>Asunto: ${asunto} </li>
            <li>Correo de Usuario: ${email} </li>
        </ul>
        <p>Mensaje: ${mensaje} </p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', //email del host
        port: 587,
        secure: false,
        auth: {
           user: 'losalamos@getnotesfs.host', //donde lo va a enviar
           pass: 'Experimentos_1' 
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const info = await transporter.sendMail({
        from: "'smtp.hostinger.com' <losalamos@getnotesfs.host>",
        to: 'sfmarmolg@gmail.com',
        subject: "Formulario de Contacto 'Los Alamos'",
        html: contentHTML
    });
    
    console.log('Mensaje enviado', info.messageId);
    res.redirect('../contact');
});

module.exports = router;


