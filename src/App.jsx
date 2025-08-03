import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostInput from "./components/PostInput";
import Feed from "./components/Feed";
import { localDb } from "./services/localDb";

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts = await localDb.getPosts();
      setPosts(loadedPosts);
    };
    loadPosts();
  }, []);

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