const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Store files in memory, then upload to Cloudinary manually
const storage = multer.memoryStorage();
const uploadImages    = multer({ storage });
const uploadThumbnail = multer({ storage });

// Upload a buffer to Cloudinary — returns the result with .secure_url
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// Extract public_id from a Cloudinary URL for deletion
// e.g. https://res.cloudinary.com/demo/image/upload/v123/zoontal/products/abc.jpg
// → zoontal/products/abc
const getPublicIdFromUrl = (url = "") => {
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1) return null;
  const relevant = parts.slice(uploadIndex + 2).join("/");
  return relevant.replace(/\.[^/.]+$/, "");
};

module.exports = { cloudinary, uploadImages, uploadThumbnail, uploadToCloudinary, getPublicIdFromUrl };