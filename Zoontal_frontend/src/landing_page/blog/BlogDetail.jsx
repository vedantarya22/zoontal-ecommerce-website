import React from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../../data/data";

function BlogDetail() {
  const { slug } = useParams();

  const blog = blogPosts.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h4>Blog not found</h4>
      </div>
    );
  }
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="fw-light mb-3">{blog.title}</h1>

            {/* Meta */}
            <p className="text-muted small mb-4">
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
              {" · "}
              {blog.author}
            </p>
          </div>
        </div>

        {/* Hero image */}
        {
            blog.coverImage && (
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-10 col-xl-8">
                          <div className="ratio ratio-16x9 rounded overflow-hidden">
                        <img src={blog.coverImage.url} alt={blog.coverImage.alt} className="img-fluid w-100" />
                    </div>
                    
                    </div>
                </div>
            )
        }

        {/* Content */}
         <div className="row justify-content-center">
        <div className="col-lg-8">

          {blog.content.map((block) => {
            switch (block.type) {
              case "heading": {
                const HeadingTag = `h${block.data.level}`;
                return (
                  <HeadingTag
                    key={block.id}
                    className="fw-light mt-5 mb-3"
                  >
                    {block.data.text}
                  </HeadingTag>
                );
              }

              case "paragraph":
                return (
                  <p
                    key={block.id}
                    className="mb-4 lh-lg text-muted"
                  >
                    {block.data.text}
                  </p>
                );

              case "image":
                return (
                  <div
                    key={block.id}
                    className="my-5 text-center"
                  >
                    <img
                      src={block.data.image.url}
                      alt={block.data.image.alt}
                      className="img-fluid"
                    />
                  </div>
                );

              default:
                return null;
            }
          })}

        </div>
      </div>


      </div>
    </>
  );
}

export default BlogDetail;
