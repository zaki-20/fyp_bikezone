const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles('admin'),createProduct);

//get single product details
router.route("/product/:id").get(getProductDetails);

//get all products
router.route("/products").get(getAllProducts);

//update products
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser,authorizeRoles('admin'),  updateProduct)
  .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct)

module.exports = router