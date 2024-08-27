
const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products-router.js");
const cartsRouter = require("./routes/carts-router.js");
const viewsRouter = require("./routes/views-router.js");
require("./database.js");

// Socket.io
const socket = require("socket.io");

// Importo express-handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine({
    handlebars: require('handlebars'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");
// Middleware: 
app.use(express.json()); 
app.use(express.static("./src/public")); 

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Conectado al puerto de Efrain: ${PUERTO}`);
});

// Traemos el productManager
const ProductManager = require("./dao/db/product-manager-db.js");
const manager = new ProductManager();

// Socket.io
const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    // Envio el array de productos al realtimeProducts
    socket.emit("productos", await manager.getProducts());

    // Recibo el evento eliminarProducto
    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id);

        // Luego actualizamos los productos
        io.emit("productos", await manager.getProducts());
    });

      // Manejar el evento para agregar un producto
      socket.on("agregarProducto", async (newProduct) => {
        try {
            await manager.addProduct(newProduct);
            io.emit("productos", await manager.getProducts());
        } catch (error) {
            console.error('Error agregando producto:', error);
        }
    });

    });
