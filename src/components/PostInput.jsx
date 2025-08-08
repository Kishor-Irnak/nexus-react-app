import React, { useRef, useState } from "react";

function PostInput({ onPost }) {
  const fileInputRef = useRef(null);
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("");

  const handlePaperclipClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFileType("");
      return;
    }

    if (file.type.startsWith("image/")) {
      setFileType("Image");
    } else if (file.type.startsWith("video/")) {
      setFileType("Video");
    } else {
      setFileType("Unsupported");
    }
  };

  const handlePost = () => {
    if (!issue || !description) {
      alert("Please enter title and description");
      return;
    }

    const post = {
      issue,
      description,
      fileType,
      time: new Date().toLocaleString(),
    };

    // Get existing posts from sessionStorage
    const existing = JSON.parse(sessionStorage.getItem("tempPosts")) || [];

    // Add new post
    existing.unshift(post); // adds to top

    // Save updated list
    sessionStorage.setItem("tempPosts", JSON.stringify(existing));

    // Clear inputs
    setIssue("");
    setDescription("");
    setFileType("");

    // Notify parent to re-render PostCard
    if (onPost) onPost();
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="What issue you're facing..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <input
            type="file"
            accept="image/*, video/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {fileType && (
            <div className="mb-2 text-secondary fw-medium">
              {fileType === "Unsupported"
                ? "Unsupported file ❌"
                : `${fileType} selected ✅`}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i
                className="bi bi-paperclip btn btn-outline-dark"
                onClick={handlePaperclipClick}
                style={{ cursor: "pointer" }}
              ></i>
              <button type="button" className="btn btn-outline-primary" onClick={handlePost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
