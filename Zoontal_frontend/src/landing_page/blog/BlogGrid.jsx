import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogPosts } from "../../data/data";
function BlogGrid() {
  return (
    <>
      <div className="container py-5">
        {/* PAGE TITLE */}
        <h2 className="text-center mb-5" style={{ letterSpacing: "0.2em" }}>
          ZOONTAL BLOG
        </h2>
        <div className="row g-5">
          {blogPosts.map((blog) => (
            <div className="col-12 col-md-6 col-lg-4" key={blog.id}>
              <Link
                to={`/blogs/${blog.slug}`}
                className="text-decoration-none text-dark"
              >
                <BlogCard blog={blog} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogGrid;
