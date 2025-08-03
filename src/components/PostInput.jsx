import { useRef, useState } from "react";

function PostInput({ onAddPost }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file)); // create a preview URL
    }
  };

  const handlePost = () => {
    if (!title && !selectedFile) return;

    onAddPost({
      id: Date.now(),
      title,
      image: selectedFile,
      comments: []
    });

    // Reset inputs
    setTitle("");
    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="addon-wrapping">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="What issue are you facing..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-light p-2"
              title="Attach file"
              onClick={handleAttachClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                   fill="currentColor" className="bi bi-paperclip" viewBox="0 0 16 16">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
              </svg>
            </button>
            {selectedFile && (
              <span className="text-muted small">Image selected</span>
            )}
          </div>

          <button className="btn btn-primary btn-sm" onClick={handlePost}>
            Post Issue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
