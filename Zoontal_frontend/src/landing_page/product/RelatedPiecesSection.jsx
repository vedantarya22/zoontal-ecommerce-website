import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../catalogue/ProductCard";
import "./RelatedPiecesSection.css";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:2000";

function RelatedPiecesSection({ productId }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
     setRelated([]);
    axios
      axios.get(`${API}/product/${productId}/related`)
      .then((res) => setRelated(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  if (!related.length) return null;

  return (
    <section className="related-section py-5">
      <div className="container">
        <p className="related-subtitle">YOU MAY ALSO LIKE</p>

        <h2 className="related-title">
          Related <span>Pieces</span>
        </h2>

        <div className="row mt-4">
          {related.map((product) => (
            <div className="col-lg-3 col-md-6 mb-4" key={product._id}>
              
                <ProductCard
                  id={product._id}
                  img={product.thumbnail}
                  title={product.productTitle}
                  price={product.price}
                />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RelatedPiecesSection;
