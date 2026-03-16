const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },

  thumbnail: {
    type: String,
    default: "https://shorturl.at/sJzll", // if image is undefined
    set: (v) => (v === "" ? "https://shorturl.at/sJzll" : v), // v = value // for client side if does not provide the image
  },

  images: [String],
  price: Number,
  category: {
    type: String,
    lowercase: true, // same here
    trim: true,
  },
  collection: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
  season: String,
  fabric: String,
  gender: String,
  sku: { type: String, unique: true, sparse: true },
  slug: { type: String, unique: true, sparse: true },
},{suppressReservedKeysWarning: true });

productSchema.pre("save", async function () {
  const product = this;

  if (!product.sku || !product.slug) {
    const count = await mongoose.model("Product").countDocuments({
      category: product.category,
    });

    const num = String(count + 1).padStart(3, "0");

    const prefix = (product.category || "PRD")
      .replace(/[^a-zA-Z]/g, "")
      .substring(0, 4)
      .toUpperCase();

    if (!product.sku) {
      product.sku = `ZT-${prefix}-${num}`;
    }

    if (!product.slug) {
      const titleSlug = product.productTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      product.slug = `${titleSlug}-${num}`;
    }
  }
  // no next() needed with async hooks
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
