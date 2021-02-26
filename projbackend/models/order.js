const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  price: Number,
  count: Number,
  name: String,
});
const orderSchema = new Schema(
  {
    products: [ProductCartSchema],
    amount: Number,
    transition_id: {},
    status:{
      type:String,
      default:"",
      enum:["Canceled","Delivered","Received","Shipped","Processing"]
    },
    updated: Date,
    address: String,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductCart=mongoose.model("ProductCart",ProductCartSchema)
const Order = mongoose.model("Order", orderSchema);
module.exports = { Order, ProductCart };
