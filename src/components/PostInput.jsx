import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
      setSelectedFile(file); // store actual file
    }
  };

  const handlePost = async () => {
    if (!title && !selectedFile) return;

    let imageURL = "";
    if (selectedFile) {
      // 1. Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      imageURL = await getDownloadURL(storageRef);
    }

    const newPost = {
      title,
      image: imageURL,
      comments: [],
      createdAt: new Date(),
    };

    // 2. Save post to Firestore
    await addDoc(collection(db, "posts"), newPost);

    // 3. Update local feed immediately (optional)
    onAddPost({
      ...newPost,
      id: Date.now(), // temporary local ID
    });

    // Reset form
    setTitle("");
    setSelectedFile(null);
    fileInputRef.current.value = null;
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
              📎
            </button>
            {selectedFile && <span className="text-muted small">{selectedFile.name}</span>}
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
