import { useState } from "react";

function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState("");

  const addComment = () => {
    if (!commentText) return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <div className="card m-3 p-3" style={{ maxWidth: "600px", width: "100%" }}>
      <h5>{post.title}</h5>
      {post.image && (
        <img src={post.image} alt="post" className="img-fluid rounded mb-2" />
      )}

      <div>
        <input
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button className="btn btn-sm btn-outline-primary" onClick={addComment}>
          Add Comment
        </button>

        <ul className="list-unstyled mt-3">
          {comments.map((c, i) => (
            <li key={i} className="border-bottom py-1">{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostCard;
