const express = require("express");
const router = express.Router();
const CartManager = require("../manager/cart-manager.js");
const cartManager = new CartManager("./src/data/carts.json");


router.post("/", async (req, res)=>{
    try {
        const newCart = await cartManager.createCarts();
        res.json(newCart);
    } catch (error) {
        res.status(500).send("server error")
    
        
    }
})

router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCartById(cartId); 
        res.json(cart.products); 
    } catch (error) {
        res.status(500).send("Error getting products from cart"); 
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid); 
    let productId = req.params.pid; 
    let quantity = req.body.quantity || 1; 

    try {
        const updatedCart = await cartManager.AddProductsToCart(cartId, productId, quantity); 
        res.json(updatedCart.products); 
    } catch (error) {
        res.status(500).send("Product error");
    }
})









module.exports= router;
