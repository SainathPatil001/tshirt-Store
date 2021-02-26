// imports
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");

// express app
const app = express();

// Db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// port
const PORT = 8000;

// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Router
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api",productRoutes );
app.use("/api",orderRoutes );
app.use("/api",stripeRoutes );

// Requests
app.get("/", function (req, res) {
  res.send("Hello");
});

// server Starting
app.listen(PORT, () => {
  console.log("Hello");
});
