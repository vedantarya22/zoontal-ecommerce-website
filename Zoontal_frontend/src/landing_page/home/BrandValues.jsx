import React from 'react';
import "./BrandValues.css";
import { Leaf, Heart, Scissors } from "lucide-react";

function BrandValues() {
    return ( 
         <section className="brand-values py-5">
      <div className="container text-center">

        <p className="section-subtitle">WHAT WE STAND FOR</p>

        <h2 className="section-title">
          Crafted with <span>Purpose</span>
        </h2>

        <div className="title-divider mx-auto"></div>

        <div className="row mt-5">

          {/* Sustainable */}
          <div className="col-md-4 mb-4">
            <div className="value-card">
              <div className="icon-circle">
                <Leaf size={28} />
              </div>
              <h4>Sustainable</h4>
              <p>
                Natural dyes and eco-friendly fabrics sourced responsibly
                from local suppliers.
              </p>
            </div>
          </div>

          {/* Fair Trade */}
          <div className="col-md-4 mb-4">
            <div className="value-card">
              <div className="icon-circle">
                <Heart size={28} />
              </div>
              <h4>Fair Trade</h4>
              <p>
                Direct partnerships with artisans ensuring fair compensation
                and creative freedom.
              </p>
            </div>
          </div>

          {/* Handcrafted */}
          <div className="col-md-4 mb-4">
            <div className="value-card">
              <div className="icon-circle">
                <Scissors size={28} />
              </div>
              <h4>Handcrafted</h4>
              <p>
                Every piece takes days to weeks of dedicated hand-work
                by master craftspeople.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
     );
}

export default BrandValues;