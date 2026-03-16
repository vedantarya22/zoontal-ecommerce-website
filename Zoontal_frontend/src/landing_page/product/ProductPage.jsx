import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ProductImageGallery from "./ProductImageGallery";
import RelatedPiecesSection from "./RelatedPiecesSection";
import "./ProductPage.css";
const API = import.meta.env.VITE_API_URL || "http://localhost:2000";
function ProductPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProduct(null);
    window.scrollTo(0, 0);
    axios.get(`${API}/product/${id}`)
      .then((res) => { setProduct(res.data); setLoading(false); })
      .catch((err) => { console.error("Failed to fetch product:", err); setLoading(false); });
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-5">Product not found</h2>;

  return (
    <>
      <div className="product-page container py-5">
        <div className="row">

          {/* LEFT IMAGE SECTION */}
          <div className="col-lg-6 mb-4">
            <ProductImageGallery
              thumbnail={product.thumbnail}
              images={product.images}
            />
          </div>

          {/* RIGHT DETAILS SECTION */}
          <div className="col-lg-6 ps-lg-5">

            <p className="breadcrumb-text mb-3">
              HOME / COLLECTION / {product.productTitle}
            </p>

            <div className="product-title-row">
              <h1 className="page-product-title mb-3">{product.productTitle}</h1>
              {/* Edit button — only visible to admin */}
              {isAdmin && (
                <Link to={`/admin/edit/${product._id}`} className="edit-product-btn">
                  ✎ Edit
                </Link>
              )}
            </div>

            <p className="product-description mb-4">{product.description}</p>

            <h3 className="page-product-price mb-4">₹{product.price}</h3>

            <hr />

            <div className="product-meta mt-4">
              <div className="d-flex mb-2">
                <span className="meta-label">FABRIC</span>
                <span className="meta-value ms-4">{product.fabric || "100% Organic Cotton"}</span>
              </div>
              <div className="d-flex mb-2">
                <span className="meta-label">SEASON</span>
                <span className="meta-value ms-4">{product.season}</span>
              </div>
              <div className="d-flex mb-2">
                <span className="meta-label">GENDER</span>
                <span className="meta-value ms-4">{product.gender}</span>
              </div>
            </div>

            <hr className="mt-4" />
          </div>
        </div>
      </div>

      <RelatedPiecesSection productId={product._id} />
    </>
  );
}

export default ProductPage;