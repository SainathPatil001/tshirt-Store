const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { IsAdmin, IsAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");
const { route } = require("./user");

//   Params
router.param("userId", getUserbyId);
router.param("categoryId", getCategoryById);

//write
router.post(
  "/category/create/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  createCategory
);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// Update Route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  updateCategory
);

// delete
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  IsAuthenticated,
  IsAdmin,
  removeCategory
);

// route
module.exports = router;
