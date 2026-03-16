const express = require("express");
const router  = express.Router();

const {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
  updateThumbnail,
} = require("../controllers/product.controller.js");

const { protect }  = require("../middlewares/authMiddleware");

const { uploadImages, uploadThumbnail: uploadThumbMiddleware } = require("../config/Cloudinary.js");

// ── Public ───────────────────────────────────────────────
router.get("/:id", getProductById);

// ── Admin protected ──────────────────────────────────────
router.post(   "/",                     protect, createProduct);
router.patch(  "/:id",                  protect, updateProduct);
router.delete( "/:id",                  protect, deleteProduct);

// Images — up to 5 files, field name: "images"
router.post(   "/:id/images",           protect, uploadImages.array("images", 5), uploadProductImages);
router.delete( "/:id/images",           protect, deleteProductImage);

// Thumbnail — single file, field name: "thumbnail"
router.patch(  "/:id/thumbnail",        protect, uploadThumbMiddleware.single("thumbnail"), updateThumbnail);

module.exports = router;