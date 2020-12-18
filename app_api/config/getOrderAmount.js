//const getItemById = require('./getItemById');
 
const mongoose = require("mongoose"); 
const Item = mongoose.model("pizza");


const getOrderAmount = async(items) =>{
  let amount = 0; 
 
  for (let index = 0; index < items.length; index++) {
    const item = items[index];   
     const itemDB = await Item.findById(item.id);
     //console.log(itemDB);

    let operation = itemDB.Precio * item.qty;
    amount += operation; 
    
  }
  //console.log("Amount", amount);
  const onlyTwoDecimals = amount.toFixed(2);
  
//console.log("onlyTwoDecimals", onlyTwoDecimals);
  const parsedAmount = parseInt(onlyTwoDecimals.replace('.', ''), 10);
  
  //console.log("parsedAmount", parsedAmount);
  return parsedAmount;
}

module.exports ={getOrderAmount};
 