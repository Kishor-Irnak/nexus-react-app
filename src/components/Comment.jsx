import React from "react";

function Comment({ comment, onUpdate }) {
  const handleVote = (change) => {
    onUpdate(comment.id, { votes: comment.votes + change });
  };

  const handleMarkBest = () => {
    onUpdate(comment.id, { isBest: true });
  };

  return (
    <div className={`p-2 border rounded mb-2 ${comment.isBest ? "border-success" : ""}`}>
      <p className="mb-1">{comment.text}</p>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-outline-success" onClick={() => handleVote(1)}>👍</button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => handleVote(-1)}>👎</button>
        <span className="text-muted">Votes: {comment.votes}</span>
        {!comment.isBest && (
          <button className="btn btn-sm btn-outline-primary ms-auto" onClick={handleMarkBest}>
            Mark as Best
          </button>
        )}
        {comment.isBest && (
          <span className="badge bg-success ms-auto">Best Answer</span>
        )}
      </div>
    </div>
  );
}

export default Comment;
