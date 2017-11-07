
// module.exports.Item = function Item(item, price){
//         this.item = String(item);
//         this.price = Number(price);
//     };

const cart = [];

module.exports = {
    Item : function(name, price){
        this.name = String(name);
        this.price = Number(price);
    },
    getCart : function() {
        return [...cart]
    },
    addToCart: function(name, price) {
        cart.push(new this.Item(name, price))
    }

}


// { Item: function(){}, Cart: function() {} }

    // var apple = new Item("Apple", 2.90)
    // var fish = new Item("Fish", "Fish")
    //
    //
    // console.log(apple, Object.values(apple).length)
    // console.log(fish, Object.values(fish).length
