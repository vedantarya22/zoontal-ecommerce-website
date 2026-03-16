import React from "react";
import "./CatalogueHero.css";

function CatalogueHero() {
  return (
    <section className="catalogue-hero mt-5 ">
      <div className="hero-watermark">شینکار</div>

      <div className="container text-center hero-content">

        <p className="hero-top-label">THE COLLECTION</p>

        <p className="hero-introducing">
          <span className="line"></span>
          INTRODUCING
          <span className="line"></span>
        </p>

        <h1 className="hero-title">
          Sheen<span>kaar</span>
        </h1>

        <p className="hero-description">
          Where heritage meets couture — each piece handcrafted by Kashmiri
          artisans, carrying centuries of craft in every thread.
        </p>

        <div className="hero-divider mx-auto"></div>

      </div>
    </section>
  );
}

export default CatalogueHero;