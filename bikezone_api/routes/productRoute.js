const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getRatingProducts, getProductsWithReviews, getNewArrivalProducts, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//create new product
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

//get single product details
router.route("/product/:id").get(getProductDetails);


//get all products
router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

//get all rated products
router.route("/products/top-rated").get(getRatingProducts);
//get all reviewed products
router.route("/products/reviewed").get(getProductsWithReviews);
//get all reviewed products
router.route("/products/new-arrival").get(getNewArrivalProducts);

//update products
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

//create reviews
router.route("/review").put(isAuthenticatedUser, createProductReview);

//get all reviews
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser,  deleteReview);



module.exports = router