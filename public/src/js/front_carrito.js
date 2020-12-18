document.addEventListener('click', (event) => {
    if (event.target && event.target.className.includes('addToCart')) {
      addToCartClicked(event);
     
     
    }
  });
  
 
  const comprarButton = document.querySelector('.comprarButton');
  comprarButton.addEventListener('click', comprarButtonClicked);
  
  const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
  );
 
 


  function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.itemProducto');
  
    const itemTitle = item.querySelector('.itemNombre').textContent;
    const itemPrice = item.querySelector('.itemPrecio').textContent;
    const itemImage = item.querySelector('.itemImagen').src;
    const itemId = item.dataset.id;
  
    addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemId);
  }

  function addItemToShoppingCart(itemTitle, itemPrice, itemImage, itemId) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
      'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
      if (elementsTitle[i].innerText === itemTitle) {
        let elementQuantity = elementsTitle[
          i
        ].parentElement.parentElement.parentElement.querySelector(
          '.shoppingCartItemQuantity'
        );
        elementQuantity.value++;
        console.log("Aumentado");
        updateShoppingCartTotal();
        return;
      }
    }


    
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="productoItem shoppingCartItem" data-id=${itemId}>
            <div class="imagenProductoCF"><img src=${itemImage} alt=""></div>
            <div class="nombrePrecioCF">
                <h6 class="shoppingCartItemTitle">${itemTitle}</h6><span class="s"><input type="numbre" value="1" class="shoppingCartItemQuantity" style="
                width: 35px;
            "></span> x <span class="shoppingCartItemPrice">${itemPrice}</span>
            </div>
            <span class="removerProductoCF buttonDelete">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
    </div>`;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
  
    shoppingCartRow
      .querySelector('.buttonDelete')
      .addEventListener('click', removeShoppingCartItem);
  
    shoppingCartRow
      .querySelector('.shoppingCartItemQuantity')
      .addEventListener('change', quantityChanged);
  
    updateShoppingCartTotal();

  }



  function updateShoppingCartTotal() {
    let total = 0;
    //const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    const shoppingCartTotal = document.querySelectorAll('.shoppingCartTotal');
    

   
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
        '.shoppingCartItemPrice'
      );
      const shoppingCartItemPrice = Number(
        shoppingCartItemPriceElement.textContent.replace('$', '')
      );
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
        '.shoppingCartItemQuantity'
      );
      const shoppingCartItemQuantity = Number(
        shoppingCartItemQuantityElement.value
      );
      total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    

    //shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
    var i=0;
    for (i = 0; i < shoppingCartTotal.length; ++i) {
        shoppingCartTotal[i].innerHTML = `${total.toFixed(2)}$`; 
      }
     // addToLocalStorage('subTotal',total);
      // const subtotal = parseFloat(localStorage.getItem('subTotal'));
       
      //console.log(subtotal);
      const shoppingCurrentCartItems = getItemsInShoppingCurrentCart();
      addToLocalStorage('shoppingCurrentCart', shoppingCurrentCartItems);
      const total2 = document.querySelector('.shoppingCartTotal').textContent;  
      addToLocalStorage('subTotal',parseFloat(total2));
  }
  
  function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
  }
  
  function quantityChanged(event) {
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
  }
  
  function comprarButtonClicked() {
    const shoppingCartItems = getItemsInShoppingCart();
    addToLocalStorage('shoppingCart', shoppingCartItems);
    
   
    updateShoppingCartTotal();
  }
  
  function getItemsInShoppingCart() {
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    const arrShoppingCartItems = []; 
  
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity'); 

      const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
      const itemId = shoppingCartItem.dataset.id;
        
      const item = {
        id: itemId,
        qty: shoppingCartItemQuantity,
      };
     
      arrShoppingCartItems.push(item); 

    });
    return arrShoppingCartItems;
  }
  function getItemsInShoppingCurrentCart() {
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    const currentShoppingCartItems =[];
    shoppingCartItems.forEach((shoppingCartItem) => {
      const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
      const shoppingCartItemImagenElement = shoppingCartItem.querySelector('.imagenProductoCF img').src;
      const shoppingCartItemNombreElement = shoppingCartItem.querySelector('.shoppingCartItemTitle').textContent;
      const shoppingCartItemPrecioElement = shoppingCartItem.querySelector('.shoppingCartItemPrice').textContent;
      const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
      const itemId = shoppingCartItem.dataset.id;
        
      const currentItem = {
        itemId: itemId,
        qty: shoppingCartItemQuantity,
        itemTitle: shoppingCartItemNombreElement,
        itemImage:shoppingCartItemImagenElement,
        itemPrice:shoppingCartItemPrecioElement
      }; 
      currentShoppingCartItems.push(currentItem);

    });
    return currentShoppingCartItems;
  }
  function addToLocalStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }


  $(document).ready(function () {
   
 
    $( "input.shoppingCartItemQuantity" ).keyup(function(event) {
      quantityChanged(event);
    
    });
 
    
    
  $(".buttonDelete").click(function (event) {
   
    removeShoppingCartItem(event);
   
  });
   
    });
 