import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth }  from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import "./EditProductPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:2000";

function EditProductPage() {
  const { showToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const fileInputRef = useRef();
  const thumbInputRef = useRef();

  const [product, setProduct] = useState({
    productTitle: "",
    description: "",
    price: "",
    category: "",
    season: "",
    fabric: "",
    gender: "",
    thumbnail: "",
    images: [],
    sku: "",
    slug: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [thumbUploading, setThumbUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);

  // ── Auth headers helper ──────────────────────────────
  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  // ── Fetch product on mount ───────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setProduct({
          productTitle: data.productTitle || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          season: data.season || "",
          fabric: data.fabric || "",
          gender: data.gender || "",
          thumbnail: data.thumbnail || "",
          images: data.images || [],
          sku: data.sku || "",
          slug: data.slug || "",
        });
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    fetch(`${API}/allCollections`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch collections:", err));
  }, []);

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  // ── Save product fields ──────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          productTitle: product.productTitle,
          description: product.description,
          price: product.price,
          category: product.category,
          season: product.season,
          fabric: product.fabric,
          gender: product.gender,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess("Changes saved successfully.");
      showToast("Changes saved successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to save changes", "error");
      setError(err.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // ── Upload additional images ─────────────────────────
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setImgUploading(true);
    setError("");
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("images", f));

      const res = await fetch(`${API}/api/products/${id}/images`, {
        method: "POST",
        headers: authHeaders(),
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProduct((prev) => ({ ...prev, images: data.images }));
    } catch (err) {
      setError(err.message || "Image upload failed.");
    } finally {
      setImgUploading(false);
      e.target.value = "";
    }
  };

  // ── Delete one image ─────────────────────────────────
  const handleDeleteImage = async (url) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      const res = await fetch(`${API}/api/products/${id}/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProduct((prev) => ({ ...prev, images: data.images }));
      showToast("Product deleted", "info");
    } catch (err) {
      showToast(err.message || "Failed to delete product", "error");
      setError(err.message || "Failed to delete image.");
    }
  };

  // ── Upload thumbnail ─────────────────────────────────
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("thumbnail", file);

      const res = await fetch(`${API}/api/products/${id}/thumbnail`, {
        method: "PATCH",
        headers: authHeaders(),
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProduct((prev) => ({ ...prev, thumbnail: data.thumbnail }));
    } catch (err) {
      setError(err.message || "Thumbnail upload failed.");
    } finally {
      setThumbUploading(false);
      e.target.value = "";
    }
  };

  // ── Delete product ───────────────────────────────────
  const handleDelete = async () => {
    if (
      !window.confirm(
        `Permanently delete "${product.productTitle}"? This cannot be undone.`,
      )
    )
      return;
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/collection");
    } catch (err) {
      setError(err.message || "Failed to delete product.");
    }
  };

  const priceLabel = product.price
    ? `₹${Number(product.price).toLocaleString("en-IN")}`
    : "";

  if (loading) return <div className="edit-loading">Loading...</div>;

  return (
    <div className="edit-page">
      {/* Breadcrumb */}
      <div className="edit-breadcrumb">
        <Link to="/">Home</Link> /<Link to="/collection"> Collection</Link> /
        <span> {product.productTitle || "Product"}</span> /
        <strong> Edit</strong>
      </div>

      {/* Header */}
      <div className="edit-header">
        <div>
          <button
            className="edit-back"
            onClick={() => navigate(`/product/${id}`)}
          >
            ← Back to Product
          </button>
          <h1 className="edit-title">
            Edit <em>{product.productTitle || "Product"}</em>
          </h1>
          {/* SKU + Slug read-only info */}
          <div className="edit-meta">
            {product.sku && <span>SKU: {product.sku}</span>}
            {product.slug && <span>Slug: {product.slug}</span>}
          </div>
        </div>
        <div className="edit-header-actions">
          <button
            className="edit-delete-btn"
            type="button"
            onClick={handleDelete}
          >
            Delete Product
          </button>
          
          <button
            className="edit-save-btn"
            onClick={handleSubmit}
            disabled={saving}
          >
            <SaveIcon />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {error && <p className="edit-error">{error}</p>}
      {success && <p className="edit-success">{success}</p>}

      <form onSubmit={handleSubmit} className="edit-grid">
        {/* LEFT: Images */}
        <div className="edit-images-col">
          {/* Thumbnail */}
          <p className="edit-field-label">Thumbnail</p>
          <div className="edit-thumb-wrap">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt="Thumbnail"
                className="edit-img"
              />
            ) : (
              <div className="edit-img-placeholder">
                <span>No thumbnail</span>
              </div>
            )}
            <button
              type="button"
              className="edit-upload-btn"
              onClick={() => thumbInputRef.current.click()}
              disabled={thumbUploading}
            >
              {thumbUploading ? "Uploading..." : "Replace Thumbnail"}
            </button>
            <input
              ref={thumbInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleThumbnailUpload}
            />
          </div>

          {/* Gallery images */}
          <p className="edit-field-label" style={{ marginTop: "1.5rem" }}>
            Gallery Images
          </p>
          {product.images.length === 0 && (
            <div className="edit-img-placeholder">
              <span>No images uploaded</span>
            </div>
          )}
          {product.images.map((img, i) => (
            <div className="edit-img-wrap" key={i}>
              <img src={img} alt={`Image ${i + 1}`} className="edit-img" />
              <div className="edit-img-footer">
                <span className="edit-img-label">Image {i + 1}</span>
                <button
                  type="button"
                  className="edit-img-delete"
                  onClick={() => handleDeleteImage(img)}
                >
                  ✕ Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="edit-upload-btn"
            onClick={() => fileInputRef.current.click()}
            disabled={imgUploading}
          >
            {imgUploading ? "Uploading..." : "+ Upload Images"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        {/* RIGHT: Fields */}
        <div className="edit-fields-col">
          {/* Title */}
          <div className="edit-field">
            <label className="edit-field-label">Product Title</label>
            <input
              className="edit-input"
              type="text"
              value={product.productTitle}
              onChange={(e) => handleChange("productTitle", e.target.value)}
              placeholder="Product name"
              required
            />
          </div>

          {/* Price */}
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-field-label">Price (₹)</label>
              <input
                className="edit-input"
                type="number"
                value={product.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="4500"
              />
            </div>
            <div className="edit-field">
              <label className="edit-field-label">Price Label</label>
              <input
                className="edit-input"
                type="text"
                value={priceLabel}
                readOnly
                placeholder="Auto-generated"
              />
            </div>
          </div>

          {/* Description */}
          <div className="edit-field">
            <label className="edit-field-label">Description</label>
            <textarea
              className="edit-textarea"
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description..."
              rows={4}
            />
          </div>

          {/* Fabric + Gender */}
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-field-label">Fabric</label>
              <input
                className="edit-input"
                type="text"
                value={product.fabric}
                onChange={(e) => handleChange("fabric", e.target.value)}
                placeholder="e.g. Pure Pashmina"
              />
            </div>
            <div className="edit-field">
              <label className="edit-field-label">Gender</label>
              <select
                className="edit-select"
                value={product.gender}
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
          <div className="edit-row">
            <div className="edit-field">
              <label className="edit-field-label">Season</label>
              <select
                className="edit-select"
                value={product.season}
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
            <div className="edit-field">
              <label className="edit-field-label">Category</label>
              <select
                className="edit-select"
                value={product.category}
                onChange={(e) => handleChange("category", e.target.value)}
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
        </div>
      </form>
    </div>
  );
}

function SaveIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default EditProductPage;
