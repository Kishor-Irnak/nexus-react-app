import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";

function PostCard({ refresh }) {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(sessionStorage.getItem("tempPosts")) || [];
    setPostList(posts);
  }, [refresh]);

  const updatePost = (index, updatedPost) => {
    const updatedList = [...postList];
    updatedList[index] = updatedPost;
    setPostList(updatedList);
    sessionStorage.setItem("tempPosts", JSON.stringify(updatedList));
  };

  if (postList.length === 0) return null;

  return (
    <>
      {postList.map((post, index) => (
        <div key={index} className="container d-flex justify-content-center">
          <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
            <img
              src="https://i.postimg.cc/59RVHdST/github2.jpg"
              className="card-img-top"
              alt="Post Visual"
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
              <CommentSection post={post} index={index} onUpdate={updatePost} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostCard;
