var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signOut, signup, signin, isSignedIn } = require("../controllers/auth");

// SignUp
router.post(
  "/signup",
  check("name", "Name should be atLeast 3 character").isLength({ min: 3 }),
  check("email", "Email is required").isEmail(),
  check("password").isLength({ min: 5 }),
  signup
);

// SignIn
router.post(
  "/signin",
  check("email", "Email is required").isEmail(),
  check("password", "Password Should Be greater than 5 Characters").isLength({
    min: 5,
  }),
  signin
);

// SignOut
router.get("/signout", signOut);

// test
router.get("/test", isSignedIn, (req, res) => {
  res.send("Testing");
});

// Module Export
module.exports = router;
