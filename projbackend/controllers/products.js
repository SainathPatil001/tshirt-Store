const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");
const { updateOne } = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Cannot Find the products" });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Problem is with the Image" });
    }
    // console.log("Parsing done.");
    // console.log(fields);
    // console.log(file);

    const { price, name, description, category, stock } = fields;
    if (!price || !name || !description || !category || !stock) {
      return res
        .status(400)
        .json({ error: "Please Include the required Fields" });
    }
    let product = new Product(fields);
    console.log(file.photo);
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: "File size is too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Saving photo In database is Failed" });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }

  next();
};

// delete product
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete" });
    }

    res.json({message:"deletion was success", deletedProduct});
  });
};
// update product
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: "Problem is with the Image" });
    }

    //  Update
    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ err: "File size is too big" });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: "Updating of Product failed" });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .sort([[sortBy, "asc"]])
    .populate("category")
    .select("-photo")
    .limit(limit)
    .exec((err, product) => {
      if (err) {
        res.status(400).json({ error: "No product Found" });
      }

      res.json(product);
    });
};

exports.updateStock = (req, res, next) => {
  let MyOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(MyOperations, {}, (err, result) => {
    if (err) {
      res.status(400).json({ err: "Bulk Operations Failed" });
    }

    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({ err: "No category Found" });
    }

    res.json(categories);
  });
};
