const express = require("express");
const router = express.Router();
 const ProductManager = require("../manager/product-manager.js");
 const manager = new ProductManager("./src/data/productos.json");
 
 

 router.get("/products", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home",{products});
});


 router.get("/realtimeproduct", (req, res) => {
    res.render("realtimeproduct");
 })


module.exports = router;





