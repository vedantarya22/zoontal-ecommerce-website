import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { products } from "../../data/data";
// import { collections } from "../../data/data";
import CollectionCard from "./CollectionCard";
import axios from "axios";
import "./Collection.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:2000";


function Collection() {
  const [allCollections, setAllCollections] = useState([]);
  const [active, setActive] = useState("summer");

  useEffect(() => {
    axios.get(`${API}/allCollections`).then((res) => {
      setAllCollections(res.data);
    });
  }, []);

  const filteredCollections = allCollections.filter((c) => c.season === active);

  return (
    <>
      <div className="container p-4 mt-2">
        <div className="collection-start">
          <p className=" text-muted">OUR COLLECTIONS</p>
          <h2>
            Seasonal <span>Curation</span>
          </h2>
          <hr />
          <div className="segment-control mx-auto my-4">
            <button
              className={active === "summer" ? "active" : ""}
              onClick={() => setActive("summer")}
            >
              SUMMER
            </button>
            <button
              className={active === "winter" ? "active" : ""}
              onClick={() => setActive("winter")}
            >
              WINTER
            </button>
          </div>
          <div className="collection-tagline text-muted">
            Light fabrics,vibrant prints - designed for warmth.
          </div>
        </div>

        {/* Filtered Collection */}
        <div className="row g-4 mt-2 p-5">
          {filteredCollections.map((c) => (
            // Replace col-4 with:
<div className="col-12 col-md-6 col-lg-4" key={c._id}>
              <CollectionCard
                img={c.thumbnail}
                title={c.collectionName} // fixed: use collectionName
                description={c.description}
                slug={c.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Collection;
