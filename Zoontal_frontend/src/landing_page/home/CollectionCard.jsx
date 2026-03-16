// CollectionCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CollectionCard.css";
function CollectionCard({ img, title, description, slug }) {
  return (
    <Link
      to={`/collection/${slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
      className="collection-link"
    >
     <div className="card collection-card" style={{ cursor: "pointer", border: "none" }}>
        <div className="image-wrapper">
          <img
            src={img}
            className="card-img-top"
            alt={title}
          />
          <div className="overlay">
            <button className="view-btn">VIEW DETAILS</button>
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default CollectionCard;
