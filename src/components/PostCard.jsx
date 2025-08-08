import React from "react";

function PostCard() {
  const postList = JSON.parse(sessionStorage.getItem("tempPosts")) || [];

  if (postList.length === 0) return null;

  return (
    <>
      {postList.map((post, index) => (
        <div
          key={index}
          className="container d-flex justify-content-center"
        >
          <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
            <img
              src="https://i.postimg.cc/59RVHdST/github2.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{post.issue}</h5>
              <p className="card-text">{post.description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {post.fileType && `${post.fileType} attached | `}Posted on{" "}
                  {post.time}
                </small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostCard;
