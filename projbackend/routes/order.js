const express = require("express");
const router = express.Router();

const { isSignedIn, IsAuthenticated, IsAdmin } = require("../controllers/auth");
const { getUserbyId, pushOrderInPurchaseList } = require("../controllers/user");
const { updateProduct, updateStock } = require("../controllers/products");
const { getOrderById, createOrder ,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order");

// params
router.param("userId", getUserbyId);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  IsAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// all orders
router.get("/order/all/:userId",isSignedIn,IsAuthenticated,IsAdmin,getAllOrders);

// order Status
router.get("/order/status/:userId",isSignedIn,IsAuthenticated,IsAdmin,getOrderStatus)

// update Status
router.put("/order/:orderId/status/:userId",isSignedIn,IsAuthenticated,IsAdmin,updateStatus)
module.exports = router;
