import React, { useState } from "react";
import Comment from "./Comment";

function CommentSection({ post, index, onUpdate }) {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      votes: 0,
      isBest: false,
    };

    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), newComment],
    };

    onUpdate(index, updatedPost);
    setCommentText("");
  };

  const updateComment = (commentId, changes) => {
    const updatedComments = post.comments.map((comment) =>
      comment.id === commentId ? { ...comment, ...changes } : comment
    );

    // Only one comment can be best
    if (changes.isBest) {
      updatedComments.forEach((c) => {
        if (c.id !== commentId) c.isBest = false;
      });
    }

    const updatedPost = {
      ...post,
      comments: updatedComments,
    };

    onUpdate(index, updatedPost);
  };

  return (
    <div className="mt-3">
      <input
        type="text"
        placeholder="Add a comment..."
        className="form-control mb-2"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button className="btn btn-sm btn-success mb-3" onClick={handleAddComment}>
        Comment
      </button>

      {(post.comments || []).map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdate={updateComment}
        />
      ))}
    </div>
  );
}

export default CommentSection;
