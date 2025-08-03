import { useState } from "react";
import { fileDb } from "../services/fileDb"; // Changed from localDb to fileDb

function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false); // Added loading state

  const addComment = async () => {
    if (!commentText || isAddingComment) return;
    
    setIsAddingComment(true);
    try {
      await fileDb.addComment(post.id, commentText);
      setComments([...comments, commentText]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    } finally {
      setIsAddingComment(false);
    }
  };

  return (
    <div className="card m-3 p-3" style={{ maxWidth: "600px", width: "100%" }}>
      <h5>{post.title}</h5>
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="rounded mb-2"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "contain",
            borderRadius: "8px"
          }}
        />
      )}

      <div>
        <input
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isAddingComment}
        />
        <button 
          className="btn btn-sm btn-outline-primary" 
          onClick={addComment}
          disabled={isAddingComment}
        >
          {isAddingComment ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Adding...
            </>
          ) : "Add Comment"}
        </button>

        <ul className="list-unstyled mt-3">
          {comments.map((c, i) => (
            <li key={i} className="border-bottom py-1 d-flex justify-content-between align-items-center">
              {c}
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                style={{ fontSize: '0.5rem' }}
                onClick={async () => {
                  // Optional: Add delete comment functionality
                  const updatedComments = comments.filter((_, index) => index !== i);
                  setComments(updatedComments);
                  // You would need to implement updateComments in fileDb
                }}
                aria-label="Delete comment"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostCard;