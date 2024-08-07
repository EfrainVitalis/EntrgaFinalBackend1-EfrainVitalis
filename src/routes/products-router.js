const express = require("express");
const ProductManager = require("../manager/product-manager.js");
const manager = new ProductManager("./src/data/productos.json");
const router = express.Router();

let products = [];
//Listar todos los productos: 

router.get("/", async (req, res) => {
    const limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit));
        } else {
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");

    }

})

// Buscar productos por Id:

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));
        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }

    } catch (error) {
        res.send("Error de producto no esta ese id");

    }
})

//Agregar nuevo producto: 

router.post("/", async (req, res) => {
    const nuevoProducto = req.body;

    try {
        await manager.addProduct(nuevoProducto);

        res.status(201).send("Producto agregado exitosamente");
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})



const initializeProducts = async () => {
    try {
        products = await manager.getProducts();
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

initializeProducts();



router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description } = req.body;


    if (!title || !description) {
        return res.status(400).send({ status: "error", message: "Faltan parámetros en el cuerpo de la solicitud" });
    }

    try {
        const productoActualizado = {
            title,
            description
        };

        await manager.updateProduct(parseInt(pid), productoActualizado);
        res.send({ status: "success", message: "Producto actualizado" });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ status: "error", message: "Error al actualizar el producto" });
    }
});

router.delete("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const productoEliminado = await manager.deleteProduct(parseInt(id));
        if (!productoEliminado) {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        } else {
            res.send({ status: "success", message: "Producto eliminado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
});

module.exports = router;
