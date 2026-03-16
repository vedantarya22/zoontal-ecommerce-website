import React from "react";
function BlogCard({blog}) {
  return (
    <>
      <div className="card border-0 h-100 bg-transparent">
        {/* IMAGE */}
        <div className="ratio  ratio-4x3">

        <img
          src={blog.coverImage.url}
          className="card-img-top object-fit-cover"
          alt={blog.coverImage.alt}
        />
        </div>

        <div className="card-body text-center px-3">
          {/* DATE */}
          <p className="text-muted small mb-2">
            {new Date(blog.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
          {/* TITLE */}
          <h6 className="card-title fw-light">{blog.title}</h6>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
