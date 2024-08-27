
const express = require("express");
const router = express.Router();
const ProductModel = require('../dao/models/product.model.js');

router.get("/products", async (req, res) => {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = 3;

    try {
        const options = {
            page,
            limit,
            lean: true
        };

        const listProducts = await ProductModel.paginate({}, options);

        res.render("home", {
            products: listProducts.docs,
            hasPrevPage: listProducts.hasPrevPage,
            hasNextPage: listProducts.hasNextPage,
            prevPage: listProducts.prevPage,
            nextPage: listProducts.nextPage,
            currentPage: listProducts.page,
            totalPages: listProducts.totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

router.get("/realtimeproduct", (req, res) => {
    res.render("realtimeproduct");
});

module.exports = router;




