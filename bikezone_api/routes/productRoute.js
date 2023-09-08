const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/admin/product/new").post( createProduct);

//get single product details
router.route("/product/:id").get(getProductDetails);

//get all products
router.route("/products").get(isAuthenticatedUser,getAllProducts);

//update products
router
  .route("/admin/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)

module.exports = router