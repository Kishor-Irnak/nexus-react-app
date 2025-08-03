import { useRef, useState } from "react";
import { fileDb } from "../services/fileDb"; // Changed from localDb to fileDb

function PostInput({ onAddPost }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isPosting, setIsPosting] = useState(false); // Added loading state

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handlePost = async () => {
    if (!title && !selectedFile) return;
    if (isPosting) return; // Prevent multiple submissions

    setIsPosting(true);
    
    try {
      let imageURL = "";
      if (selectedFile) {
        // Convert image to base64 for storage
        imageURL = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(selectedFile);
        });
      }

      const newPost = {
        title,
        image: imageURL,
      };

      // Save to file-based DB
      const savedPost = await fileDb.addPost(newPost);
      
      // Update parent component
      onAddPost(savedPost);

      // Reset form
      setTitle("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card m-4 p-3 w-100" style={{ maxWidth: "600px" }}>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            placeholder="What issue are you facing..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPosting}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={isPosting}
        />

        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-light p-2"
              title="Attach file"
              onClick={handleAttachClick}
              disabled={isPosting}
            >
              📎
            </button>
            {selectedFile && (
              <span className="text-muted small">
                {selectedFile.name}
                <button 
                  type="button" 
                  className="btn-close ms-2" 
                  style={{ fontSize: '0.5rem' }}
                  onClick={() => {
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  aria-label="Remove file"
                />
              </span>
            )}
          </div>

          <button 
            className="btn btn-primary btn-sm" 
            onClick={handlePost}
            disabled={isPosting}
          >
            {isPosting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Posting...
              </>
            ) : "Post Issue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostInput;