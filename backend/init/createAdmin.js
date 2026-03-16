// Run ONCE to seed your admin account:
// node createAdmin.js
require("dotenv").config({ path: "../.env" })

const MONGO_URL = process.env.MONGO_URL; 
const mongoose = require("mongoose");
const Admin    = require("../models/admin.model.js");

async function run() {
  await mongoose.connect(MONGO_URL);

  const exists = await Admin.findOne({ email: "admin@zoontaj.com" });
  if (exists) { console.log("Admin already exists"); process.exit(0); }

  await Admin.create({
    email:    "Zoontaltal@gmail.com", // ← change
    password: "zoontalsuccess1K", // ← change (will be hashed on save)
  });

  console.log("Admin created");
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });

// Zoontaltal@gmail.com
// zoontalsuccess0k