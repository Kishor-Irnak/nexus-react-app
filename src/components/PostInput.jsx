function PostInput() {
  return (
    <div className="card m-4 p-3">
      {/* Input field with icon */}
      <div className="input-group mb-3">
        <span className="input-group-text" id="addon-wrapping">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="What issue are you facing..."
          aria-label="Issue"
          aria-describedby="addon-wrapping"
        />
      </div>

      {/* Attach icon and button */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Paperclip Icon */}
        <button className="btn btn-light p-2" title="Attach file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-paperclip"
            viewBox="0 0 16 16"
          >
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
          </svg>
        </button>

        {/* Post Button */}
        <button className="btn btn-primary btn-sm">Post Issue</button>
      </div>
    </div>
  );
}

export default PostInput;
