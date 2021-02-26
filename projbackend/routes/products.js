const express = require("express");
const router = express.Router();
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/products");
const { isSignedIn, IsAuthenticated, IsAdmin } = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserbyId);

//Create Product
router.post(
  "/product/create/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  createProduct
);

// get Product,photo
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete product
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  
  deleteProduct
);
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  updateProduct
);

// get all products

router.get("/products", getAllProducts);

// get all unique categories
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
