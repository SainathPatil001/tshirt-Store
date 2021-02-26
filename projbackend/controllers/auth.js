const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
// const { token } = require("morgan");

// SignUp
exports.signup = (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  const user = new User(req.body);



  user.save((err, user) => {
    if (err) {
      //  console.log(err)
      return res.status(400).json({ err: "Error" });
    }
    res.json({ name: user.name, email: user.email, id: user._id });
  });
};

// SignIn
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Email don't Exist" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "email and Password don't match" });
    }

    //  create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //  sending data to frontEnd
    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

// SignOut
exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "SignOut has been Successfully",
  });
};

// protected

// IsSigned
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// IsAuthenticated
exports.IsAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    res.status(403).json({ error: "ACCESS DENIED.." });
  }
  next();
};

//Is Admin
exports.IsAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    res.status(403).json({ error: "You are not Admin, ACCESS DENIED" });
  }
  next();
};
