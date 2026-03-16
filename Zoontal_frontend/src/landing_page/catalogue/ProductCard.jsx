import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ img, title, price, id }) {
  return (
    <Link
      to={`/product/${id}`}
      className="product-link"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card product-card border-0">

        <div className="product-img-wrapper">
          <img
            src={img}
            className="card-img-top product-img"
            alt={title}
          />

          <div className="product-overlay">
            <button className="quick-view-btn">
              QUICK VIEW
            </button>
          </div>
        </div>

        <div className="card-body px-0 pt-3">
          <h5 className="card-title product-title">{title}</h5>
          <p className="product-price mb-0">₹ {price}</p>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;