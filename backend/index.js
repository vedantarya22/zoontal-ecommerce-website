require("dotenv").config();
const express    = require("express");
const mongoose   = require("mongoose");
const cors       = require("cors");

const app        = express();
const MONGO_URL  = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/zoontal";

// ── Models ────────────────────────────────────────────────
const Product    = require("./models/productListing.js");
const Collection = require("./models/collections.js");

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: [
    "https://zoontal.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://zoontal-5ojy.onrender.com"
  ],
  credentials: true,
}));
app.use(express.json());

// ── DB ────────────────────────────────────────────────────
mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ── Server ────────────────────────────────────────────────
app.listen(process.env.PORT || 2000, () => {
  console.log(`Listening on port ${process.env.PORT || 2000}`);
});

// ═════════════════════════════════════════════════════════
// EXISTING ROUTES (untouched)
// ═════════════════════════════════════════════════════════
const { getRelatedProducts } = require("./controllers/product.controller.js");

app.get("/", (req, res) => res.send("Hi i am root"));

app.get("/allProducts", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.send(allProducts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/allCollections", async (req, res) => {
  try {
    const allCollections = await Collection.find({});
    res.send(allCollections);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/collection/:slug/products", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.slug });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/product/:id/related", getRelatedProducts);

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("collection");
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ═════════════════════════════════════════════════════════
// NEW API ROUTES
// ═════════════════════════════════════════════════════════
app.use("/api/admin",    require("./routes/auth.routes.js"));
app.use("/api/products", require("./routes/product.routes.js"));