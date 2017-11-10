// cart.test.js
// Import Chai for assaertions
const chai = require('chai')
const should = chai.should()
const expect = chai.expect


// We will be testing these methods from cart.js
const shoppingCart = require('./shopping-cart');
const createItem = shoppingCart.createItem;
const count = shoppingCart.getCount;
const clearCart = shoppingCart.clearCart;
const addToCart = shoppingCart.addToCart;
const removeFromCart = shoppingCart.removeFromCart;
const getTotal = shoppingCart.getTotal;

it('Should create a new item with name and price', () => {
  var newItem = shoppingCart.createItem("Laptop", 3000.00);
  expect(newItem).to.have.property("name");
  expect(newItem).to.have.property("price");
})

it('Should return an array containing all items in cart', ()=>{
  let cart = shoppingCart.getCart();
  expect(cart).to.have.lengthOf(0);
  expect(cart).to.be.an('array');
});

it('Should add a new item to the shopping cart', ()=>{
  let item = shoppingCart.createItem("dollar",3.99);
  shoppingCart.addToCart(item);
  expect(shoppingCart.getCart()).to.have.length(1);

});
it('Should return the number of items in the cart', () => {
  //need to clear cart first
  clearCart();
  let apple = createItem("Apple", 0.99);
  shoppingCart.addToCart(apple);
  let cartCount = shoppingCart.getCount();
  expect(cartCount).to.equal(1);
});
it('Should remove items from cart', () => {
  clearCart();
  let apple = createItem("Apple", 0.99);
  shoppingCart.addToCart(apple);
  expect(shoppingCart.getCount()).to.equal(1);
  clearCart();
  expect(shoppingCart.getCount()).to.equal(0);

});

// Stretch challenges
it("should apply a discounted rate after a set number of items", () =>{
    clearCart();
    // let discountlimit = 5;

    let strawberry = createItem("Strawberry", 0.50, 2, 5, 0.2);
    shoppingCart.addToCart(strawberry);
    let totalprice = getTotal();
    expect(totalprice).to.equal(0.50*2)
    // Should be normal; 2 items, total is 1.00
    strawberry = createItem("Strawberry", 0.50, 2, 5, 0.2);
    shoppingCart.addToCart(strawberry);
    totalprice = getTotal();
    expect(totalprice).to.equal(0.50*4)
    // Still normal; 4 items, 2.00
    strawberry = createItem("Strawberry", 0.50, 2, 5, 0.2);
    shoppingCart.addToCart(strawberry);
    totalprice = getTotal()
    expect(totalprice).to.equal(0.50*6*(1.0-0.2))
    // Discount now applies; 6 items, 20% discount

    let guava = createItem("Guava", 2.00, 2, 4, 0.3);
    shoppingCart.addToCart(guava)
    totalprice = getTotal()
    expect(totalprice).to.equal( (0.50*6*(1.0-0.2)) + 2.00*2)

    guava = createItem("Guava", 2.00, 2, 4, 0.3);
    shoppingCart.addToCart(guava)
    totalprice = getTotal()
    expect(totalprice).to.equal( (0.50*6*(1.0-0.2)) + ((2.00*4)*(1.0-0.3)))







})


// it('Should remove an item from the cart', () =>{
//     clearCart()
//     let mango = createItem("Mango", .902145, 3);
//     expect(count()).to.equal(0)
//     console.log("Mango is", mango)
//     addToCart(mango) // + 3
//     console.log("Current after adding to cart:", count())        // Should be 3 after adding
//     expect(count()).to.equal(3)
//     console.log("Base mango item is, after adding to cart:", mango)
//     removeFromCart("Mango")     // Should be 2 after removal
//     console.log("Base mango item is, after removing from cart:", mango)
//     // That's peculiar; it changes the mango after moving it to the cart
//     expect(count()).to.equal(2)
//     removeFromCart("Fish")      // Should do nothing; there is no fish
//     removeFromCart("Fish")
//     expect(count()).to.equal(2)
//     console.log("Current after removing from cart:", count())        // Should be 2 after adding
//     console.log("Mango is", mango)
//     addToCart(mango)
//     console.log("Current after adding 3 to cart:", count())        // Should be 5 after adding
//
//     expect(count()).to.equal(5)
// })

it('Should update the count of items in the cart', () => {
  clearCart();
  let apple = createItem("Apple", 0.99);
  addToCart(apple);
  let itemCount = count  // Should be 1
  let greenApple = createItem("Apple", 0.90, 3);
  addToCart(greenApple);
  itemCount = count(); // update the count, it should be 2 now
  expect(itemCount).to.equal(4);

});
it('Should remove an item when its count is 0',() =>{
  clearCart()
  let apple = createItem("Apple", .90, 3);
  addToCart(apple);
  removeFromCart("Apple");
  removeFromCart("Apple");
  removeFromCart("Apple");
  itemCount = count();
  expect(itemCount).to.equal(0);
  expect(shoppingCart.getCart()).to.have.length(0);
} );
it('Should return the total cost of all items in the cart', () => {
  clearCart();

  let apple = createItem("Apple", 0.99, 2);
  addToCart(apple);
  let totalPrice = getTotal();
  expect(totalPrice).to.equal(0.99 * 2);

  let orange = createItem("Orange", 1.99);
  addToCart(orange);
  totalPrice = getTotal();
  expect(totalPrice).to.equal((0.99 * 2) + 1.99);
});
