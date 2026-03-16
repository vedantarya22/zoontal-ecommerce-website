require("dotenv").config({ path: "../.env" });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const os = require("os");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageDir = "C:/Users/Vedant/OneDrive/Desktop/Projects/zoontal/Zoontal_Sample/Zoontal_frontend/public/zoontal images";

const getAllImages = (dir) => {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(fullPath));
    } else if (/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG)$/.test(item)) {
      results.push(fullPath);
    }
  }
  return results;
};

const uploadAll = async () => {
  const allImages = getAllImages(imageDir);
  console.log(`Found ${allImages.length} images`);

  for (const filePath of allImages) {
    const file = path.basename(filePath);
    const subFolder = path.relative(imageDir, path.dirname(filePath));
    const cloudFolder = subFolder 
  ? `zoontal/${subFolder.replace(/\\/g, "/")}` 
  : "zoontal";
    const tempPath = path.join(os.tmpdir(), `compressed_${file}`);

    try {
      await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(tempPath);

      const result = await cloudinary.uploader.upload(tempPath, {
        folder: cloudFolder,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      });

      fs.unlinkSync(tempPath);
      console.log(`✅ ${subFolder}/${file} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ ${file} failed:`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  console.log("🎉 All uploads complete");
};

uploadAll();