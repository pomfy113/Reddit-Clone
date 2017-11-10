// shopping-cart.js
// These methods crete a simple shopping cart system.

var cart = []

function createItem(name, price, quantity = 1, discountnum, discount){
  return { name, price, quantity, discountnum, discount}
}
function addToCart(newItem){
  for (let item of cart) {


    if  (newItem.name == item.name) {
        // if (item.quantity >= item.discountnum){
        //     item.price = item.price * (1.0 - item.discount)
        // }
      item.quantity += newItem.quantity
      return
       // bye bye :)
    }
  }
  cart.push(newItem);
}
function getCart(){
  return [...cart];
}


function getCount() {
   return cart.reduce((total, item) => {
    /* (total, item) -> int

        Return the sum of the quantity of items
        in the shopping cart.

    */
    return total + item.quantity;
  }, 0);

}

function removeFromCart(itemName){
  for (let item in cart){
    if (cart[item].name == itemName){
      cart[item].quantity -= 1;

      if (cart[item].quantity < 1){
        cart.splice(item, 1);
        return
      }
    }
  }
}

function getTotal() {
  return cart.reduce((total, item) => {
    let discount = 1.0
    if(item.quantity >= item.discountnum){
        discount -= item.discount // 0.8
    }
    console.log("Item quant", item.quantity, discount)
    return total + (item.quantity * item.price * discount);
  }, 0);
}

function clearCart() {
  cart = [];
}
module.exports.createItem = createItem;
module.exports.addToCart = addToCart;
module.exports.getCart = getCart;
module.exports.getCount = getCount;
module.exports.getTotal = getTotal;
module.exports.clearCart = clearCart;
module.exports.removeFromCart = removeFromCart;
