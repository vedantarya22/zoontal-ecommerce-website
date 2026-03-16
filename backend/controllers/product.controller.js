const Product = require("../models/productListing.js");
const { cloudinary, uploadToCloudinary, getPublicIdFromUrl } = require("../config/Cloudinary");

// ─── existing (untouched) ─────────────────────────────────
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const query = product.collection
      ? { collection: product.collection, _id: { $ne: product._id } }
      : { category: product.category,    _id: { $ne: product._id } };

    const related = await Product.find(query).limit(4);
    res.json(related);
  } catch (err) {
    console.error("getRelatedProducts error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ─── GET /api/products/:id ────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("collection");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── POST /api/products ───────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─── PATCH /api/products/:id ──────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const allowed = ["productTitle", "description", "price", "category", "season", "fabric", "gender"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─── DELETE /api/products/:id ─────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const allUrls = [...(product.images || []), product.thumbnail].filter(Boolean);
    await Promise.allSettled(
      allUrls.map((url) => {
        const publicId = getPublicIdFromUrl(url);
        return publicId ? cloudinary.uploader.destroy(publicId) : Promise.resolve();
      })
    );

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── POST /api/products/:id/images ───────────────────────
// multipart field: "images" (up to 5)
const uploadProductImages = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No images provided" });

    // Upload each buffer to Cloudinary
    const results = await Promise.all(
      req.files.map((f) => uploadToCloudinary(f.buffer, "zoontal/products"))
    );

    const newUrls = results.map((r) => r.secure_url);
    product.images = [...(product.images || []), ...newUrls];

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DELETE /api/products/:id/images ─────────────────────
// body: { url: "https://res.cloudinary.com/..." }
const deleteProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "Image URL required" });

    const publicId = getPublicIdFromUrl(url);
    if (publicId) await cloudinary.uploader.destroy(publicId);

    product.images = product.images.filter((img) => img !== url);
    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── PATCH /api/products/:id/thumbnail ───────────────────
// multipart field: "thumbnail" (single file)
const updateThumbnail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    // Delete old thumbnail from Cloudinary if it's a Cloudinary URL
    if (product.thumbnail && product.thumbnail.includes("cloudinary")) {
      const oldId = getPublicIdFromUrl(product.thumbnail);
      if (oldId) await cloudinary.uploader.destroy(oldId);
    }

    const result = await uploadToCloudinary(req.file.buffer, "zoontal/thumbnails");
    product.thumbnail = result.secure_url;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getRelatedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
  updateThumbnail,
};