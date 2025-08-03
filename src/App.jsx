import { useState } from "react";
import Navbar from "./components/Navbar";  // Fixed typo from Mavbar
import PostInput from "./components/PostInput";
import Feed from "./components/Feed";  // Fixed import path

function App() {
  const [posts, setPosts] = useState([]);
  
  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <Navbar />
      <PostInput onAddPost={handleAddPost} />
      <Feed posts={posts} />
    </div>
  );
}

export default App;