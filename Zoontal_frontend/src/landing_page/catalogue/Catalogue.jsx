import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import { useParams, useSearchParams, Link } from "react-router-dom";
import CategoryBar from "./CategoryBar";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "./Catalogue.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:2000";

function Catalogue() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const location = useLocation();
  const queryCategory = new URLSearchParams(location.search).get("category");
  const activeCategory = slug || queryCategory || null;

  const { isAdmin } = useAuth();

  useEffect(() => {
    if (activeCategory) {
      axios
        .get(`${API}/collection/${activeCategory}/products`)
        .then((res) => setAllProducts(res.data));
    } else {
      axios
        .get(`${API}/allProducts`)
        .then((res) => setAllProducts(res.data));
    }
  }, [activeCategory]);

  const filteredProducts = allProducts.filter((p) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      p.productTitle?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.fabric?.toLowerCase().includes(q) ||
      p.gender?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="container p-5">
        <CategoryBar />

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onClear={() => setSearchText("")}
        />

        {/* Admin bar — only visible when logged in */}
        {isAdmin && (
          <div className="catalogue-admin-bar">
            <Link to="/admin/add-product" className="catalogue-add-btn">
              + Add Product
            </Link>
            <span className="catalogue-count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        <div className="allProducts mt-5">
          <div className="row mt-3">
            {filteredProducts.map((product) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 mb-5"
                key={product._id}
              >
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
      </div>
    </>
  );
}

export default Catalogue;