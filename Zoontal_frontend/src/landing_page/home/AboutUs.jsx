import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <>
    
      <section className="about-section py-5">
        <div className="container-fluid">
          <div className="row g-0 align-items-center">
            {/* Left image */}
            <div className="col-12 col-lg-6">
              <div className="about-image"></div>
            </div>

            {/* right content */}
            <div className="col-12 col-lg-6">
              <div className="about-content px-5">
                <p className="about-subtitle">OUR STORY</p>
                <h2 className="about-title">
                  Preserving the Art of <span>Kashmir</span>
                </h2>
                <hr />
                <p className="about-text">
                  Each piece at Zoontal is a testament to centuries-old Kashmiri
                  craftsmanship. Our artisans — many from families who have
                  practiced these techniques for generations — pour their hearts
                  into every stitch, every block print, every weave.
                </p>
                <p className="about-text">
                  From the intricate Kashida embroidery to the delicate Sozni
                  needlework, we work directly with over 40 artisan families
                  across the Kashmir Valley, ensuring fair wages and preserving
                  techniques that might otherwise be lost to time.
                </p>

               
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
