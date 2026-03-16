import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow">Handcrafted in the Heart of Kashmir</p>
        <h1 className="hero-heading">
          Kashmir's <em>finest,</em> delivered
        </h1>
        <p className="hero-sub">
          Where timeless Kashmiri artistry meets contemporary fashion.<br />
          Empower traditions, elevate your style.
        </p>
        <Link to="/collection" className="hero-btn">
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

export default Hero;