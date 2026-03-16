import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "./AddProductPage.css";


const API = import.meta.env.VITE_API_URL || "http://localhost:2000";

function AddProductPage() {
    const { showToast } = useToast();
  const navigate = useNavigate();
  const { token } = useAuth();
  const thumbInputRef = useRef();
  const imgsInputRef = useRef();

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    productTitle: "",
    description: "",
    price: "",
    fabric: "",
    season: "",
    gender: "",
    category: "",
  });

  // thumbnail: single File object
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  // gallery images: array of File objects in order
  const [imgFiles, setImgFiles] = useState([]);
  const [imgPreviews, setImgPreviews] = useState([]);

  // slug preview (auto-generated from title)
  const slugPreview = form.productTitle
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const priceLabel = form.price
    ? `₹${Number(form.price).toLocaleString("en-IN")}`
    : "";

  useEffect(() => {
    fetch(`${API}/allCollections`)
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ── Thumbnail ──────────────────────────────────────
  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
  };

  // ── Gallery images ─────────────────────────────────
  const handleImgsChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setImgFiles((prev) => [...prev, ...files]);
    setImgPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = "";
  };

  const removeImg = (index) => {
    setImgFiles((prev) => prev.filter((_, i) => i !== index));
    setImgPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // move image up in order
  const moveUp = (index) => {
    if (index === 0) return;
    const newFiles = [...imgFiles];
    const newPreviews = [...imgPreviews];
    [newFiles[index - 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index - 1],
    ];
    [newPreviews[index - 1], newPreviews[index]] = [
      newPreviews[index],
      newPreviews[index - 1],
    ];
    setImgFiles(newFiles);
    setImgPreviews(newPreviews);
  };

  // move image down in order
  const moveDown = (index) => {
    if (index === imgFiles.length - 1) return;
    const newFiles = [...imgFiles];
    const newPreviews = [...imgPreviews];
    [newFiles[index + 1], newFiles[index]] = [
      newFiles[index],
      newFiles[index + 1],
    ];
    [newPreviews[index + 1], newPreviews[index]] = [
      newPreviews[index],
      newPreviews[index + 1],
    ];
    setImgFiles(newFiles);
    setImgPreviews(newPreviews);
  };

  // ── Submit ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productTitle || !form.price || !form.category) {
      setError("Title, price and category are required.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const authHeader = { Authorization: `Bearer ${token}` };

      // 1. Create product (text fields)
      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      const created = await res.json();
      if (!res.ok) throw new Error(created.message);

      const productId = created._id;

      // 2. Upload thumbnail if provided
      if (thumbFile) {
        const fd = new FormData();
        fd.append("thumbnail", thumbFile);
        await fetch(`${API}/api/products/${productId}/thumbnail`, {
          method: "PATCH",
          headers: authHeader,
          body: fd,
        });
      }

      // 3. Upload gallery images in order
      if (imgFiles.length > 0) {
        const fd = new FormData();
        imgFiles.forEach((f) => fd.append("images", f));
        await fetch(`${API}/api/products/${productId}/images`, {
          method: "POST",
          headers: authHeader,
          body: fd,
        });
      }
      showToast("Product added successfully!", "success");
      navigate(`/product/${productId}`);
    } catch (err) {
        showToast(err.message || "Failed to create product", "error");
      setError(err.message || "Failed to create product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="add-page">
      {/* Header */}
      <div className="add-header">
        <button className="add-back" onClick={() => navigate("/collection")}>
          ← Back to Collection
        </button>
        <button
          className="add-submit-btn"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? "Adding..." : "Add Product"}
        </button>
      </div>

      <h1 className="add-title">
        Add New <em>Product</em>
      </h1>

      {error && <p className="add-error">{error}</p>}

      <form onSubmit={handleSubmit} className="add-form">
        {/* Product Title */}
        <div className="add-field">
          <label className="add-label">Product Title</label>
          <input
            className="add-input"
            type="text"
            placeholder="e.g. Embroidered Pashmina"
            value={form.productTitle}
            onChange={(e) => handleChange("productTitle", e.target.value)}
            required
          />
        </div>

        {/* Slug preview */}
        <div className="add-field">
          <label className="add-label">Slug (Auto-generated)</label>
          <input
            className="add-input"
            type="text"
            value={slugPreview}
            readOnly
            placeholder="auto-generated from title"
          />
        </div>

        {/* Price + Price Label */}
        <div className="add-row">
          <div className="add-field">
            <label className="add-label">Price (₹)</label>
            <input
              className="add-input"
              type="number"
              placeholder="e.g. 3200"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
              required
            />
          </div>
          <div className="add-field">
            <label className="add-label">Price Label</label>
            <input
              className="add-input"
              type="text"
              value={priceLabel}
              readOnly
              placeholder="Auto-generated"
            />
          </div>
        </div>

        {/* Description */}
        <div className="add-field">
          <label className="add-label">Description</label>
          <textarea
            className="add-textarea"
            placeholder="Describe the product..."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
          />
        </div>

        {/* Fabric + Gender */}
        <div className="add-row">
          <div className="add-field">
            <label className="add-label">Fabric</label>
            <input
              className="add-input"
              type="text"
              placeholder="e.g. Pure Pashmina Wool"
              value={form.fabric}
              onChange={(e) => handleChange("fabric", e.target.value)}
            />
          </div>
          <div className="add-field">
            <label className="add-label">Gender</label>
            <select
              className="add-select"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select</option>
              {["Men", "Women", "Unisex"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Season + Category */}
        <div className="add-row">
          <div className="add-field">
            <label className="add-label">Season</label>
            <select
              className="add-select"
              value={form.season}
              onChange={(e) => handleChange("season", e.target.value)}
            >
              <option value="">Select</option>
              {["Summer", "Winter", "Spring", "Autumn", "All Season"].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>
          <div className="add-field">
            <label className="add-label">Category</label>
            <select
              className="add-select"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
            >
              <option value="">Select category</option>
              {categories.map((col) => (
                <option key={col._id} value={col.slug}>
                  {col.collectionName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Divider */}
        <hr className="add-divider" />

        {/* Thumbnail */}
        <div className="add-field">
          <label className="add-label">Thumbnail</label>
          {thumbPreview ? (
            <div className="add-thumb-wrap">
              <img
                src={thumbPreview}
                alt="Thumbnail"
                className="add-thumb-img"
              />
              <button
                type="button"
                className="add-replace-btn"
                onClick={() => thumbInputRef.current.click()}
              >
                Replace
              </button>
            </div>
          ) : (
            <div
              className="add-upload-zone"
              onClick={() => thumbInputRef.current.click()}
            >
              <span>+ Upload Thumbnail</span>
              <p>Click to select image</p>
            </div>
          )}
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleThumbChange}
          />
        </div>

        {/* Gallery Images */}
        <div className="add-field">
          <label className="add-label">
            Gallery Images{" "}
            <span className="add-label-hint">(drag to reorder)</span>
          </label>

          <div className="add-gallery-grid">
            {imgPreviews.map((src, i) => (
              <div className="add-gallery-item" key={i}>
                <img
                  src={src}
                  alt={`Image ${i + 1}`}
                  className="add-gallery-img"
                />
                <div className="add-gallery-controls">
                  <span className="add-gallery-num">#{i + 1}</span>
                  <div className="add-gallery-order">
                    <button
                      type="button"
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(i)}
                      disabled={i === imgPreviews.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    type="button"
                    className="add-gallery-remove"
                    onClick={() => removeImg(i)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {/* Add more zone */}
            <div
              className="add-upload-zone add-gallery-add"
              onClick={() => imgsInputRef.current.click()}
            >
              <span>+</span>
              <p>Add Images</p>
            </div>
          </div>

          <input
            ref={imgsInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImgsChange}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
