  
const currentData =   JSON.parse(localStorage.getItem('shoppingCurrentCart'));


window.onload = getData();


function getData() {
  if(currentData!=null || currentData !=undefined){
    printData(currentData);
  }else{
    console.log("no hay datos actuales");
  }
}

function printData(data) {
  const items = document.querySelector('.shoppingCartItemsContainer');

  const itemContainer = document.createElement('div');  
  data.forEach((item) => {
     
    itemContainer.innerHTML += createDomElement(item);
    items.append(itemContainer);
  });
  
  const shoppingCartTotal = document.querySelectorAll('.shoppingCartTotal');
  var i=0;
  var tt= localStorage.getItem('subTotal');
  for (i = 0; i < shoppingCartTotal.length; ++i) {
      shoppingCartTotal[i].innerHTML = `${tt}$`;  
    } 

}

function createDomElement(item) {
  const itemHtml = `
          <div class="productoItem shoppingCartItem" data-id=${item.itemId}>
                  <div class="imagenProductoCF"><img src=${item.itemImage} alt=""></div>
                  <div class="nombrePrecioCF">
                      <h6 class="shoppingCartItemTitle">${item.itemTitle}</h6><span class="s"><input type="numbre" value=${item.qty} class="shoppingCartItemQuantity" style="
                      width: 35px;
                  "></span> x <span class="shoppingCartItemPrice">${item.itemPrice}</span>
                  </div>
                  <span class="removerProductoCF buttonDelete">
                      <ion-icon name="trash-outline"></ion-icon>
                  </span>
          </div>`;
  return itemHtml;
}

