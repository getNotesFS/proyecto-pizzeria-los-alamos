 
const express = require('express');
const {getOrderAmount} = require('../config/getOrderAmount');
 
const stripe = require('stripe')(process.env.STRIPE_SK);

//CREAR INTENTO DE PAGO
const paymentIntentP = async(req, res = response) =>{
  const items = req.body;
  
  console.log(items);
  console.log(await getOrderAmount(items));
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await getOrderAmount(items),
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });

}
 

module.exports ={paymentIntentP};
