
const express = require("express");
const app = express();
const PUERTO = 8080;
const productRouter = require("./routes/product-router.js")
const cartsRouter = require("./routes/cart-router.js");


//Middleware: 
app.use(express.json()); 
//Le decimos al servidor que vamos a trabajar con JSON. 

//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})