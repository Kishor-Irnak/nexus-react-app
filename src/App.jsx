import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PostInput from "./components/PostInput";
import PostCard from "./components/PostCard";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleNewPost = () => {
    setRefresh((prev) => !prev); // trigger re-render
  };

  return (
    <div>
      <Navbar />
      <PostInput onPost={handleNewPost} />
      <PostCard refresh={refresh} />
    </div>
  );
}

export default App;
