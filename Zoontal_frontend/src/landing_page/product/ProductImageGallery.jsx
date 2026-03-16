import React from 'react';
import "./ProductImageGallery.css";
import { useState } from 'react';
function ProductImageGallery({thumbnail,images}) {

    const [selectedImage, setSelectedImage] = useState(thumbnail);
      const galleryImages = [thumbnail, ...images.filter(img => img !== thumbnail)];
    return (  
             <div className="container d-flex mt-4">
      {/* Thumbnail List */}
      <div className="thumb-container me-3">
        {galleryImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="thumb"
            className={`thumb-img ${selectedImage === img ? "active-thumb" : ""}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Main Large Image */}
      <div>
        <img
          src={selectedImage}
          alt="main image"
          className="main-image"
        />
      </div>
    </div>
    );
}

export default ProductImageGallery;