const User = require("../models/user");
const Order = require("../models/Order");
exports.getUserbyId = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ err: "No user was found in Db" });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypt_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, user) => {
    if (err || !user) {
      return res.status(400).res.json({ err: "Users not find in database" });
    }
    return res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    {
      $set: req.body,
    },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(400).json({ err: "Updating failed" });
      }
      user.salt = undefined;
      user.encrypt_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        res.json({ error: "No order In the purchase List" });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
   req.body.order.products.forEach((element) => {
    purchases.push({
      _id: element._id,
      name: element.name,
      description: element.description,
      category: element.category,
      quantity: element.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });

    User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purchases: purchases } },
      { new: true },
      (err, purchases) => {
        if (err) {
          return res
            .status(400)
            .json({ error: "Unable to save purchase List" });
        }

        next();
      }
    );
  });
};
