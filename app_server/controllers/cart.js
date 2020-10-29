/*Controladores para la Collection Locations*/

 

const cart = (req, res) => {
    res.render('cart', { title: 'Listado de Compra' });
}



const checkout = (req, res) => {
    res.render('sec_checkout', { title: 'Checkout' });
}


 



const ordercomplete = (req, res) => {
    res.render('sec_order_complete', { title: 'Orden Completa' });
}

module.exports = {
    //separador de módulos con una "COMA"
    cart,
    checkout, 
    ordercomplete

}