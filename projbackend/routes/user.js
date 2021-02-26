var express = require("express");
var router = express.Router();

const {
  getUserbyId,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
const { isSignedIn, IsAuthenticated, IsAdmin } = require("../controllers/auth");

router.param("userId", getUserbyId);
router.get("/user/:userId", isSignedIn, IsAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, IsAuthenticated, updateUser);
router.get(
  "/orders/user/:userId",
  isSignedIn,
  IsAuthenticated,
  userPurchaseList
);

module.exports = router;
