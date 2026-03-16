const mongoose = require("mongoose");
const Product = require("../models/productListing.js");
const Collection = require("../models/collections.js");
const { products, collections } = require("./data.js");
require("dotenv").config({ path: "../.env" })

const MONGO_URL = process.env.MONGO_URL; 

main()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // 1. Seed collections first
  await Collection.deleteMany({});
  await Collection.insertMany(collections);
  console.log("✅ Collections seeded");

  // 2. Seed products with pre-save hook
  await Product.deleteMany({});

  for (const p of products) {
    const collection = await Collection.findOne({ slug: p.category });

    if (!collection) {
      console.warn(`⚠️  No collection found for category: "${p.category}" — skipping collection link`);
    }

    const newProduct = new Product({
      ...p,
      collection: collection ? collection._id : null,
    });

    await newProduct.save();
    console.log(`✅ ${newProduct.productTitle} [${p.category}] — SKU: ${newProduct.sku} — Slug: ${newProduct.slug}`);
  }

  console.log("\n✅ DB fully initialised");
  mongoose.connection.close();
};

initDB();