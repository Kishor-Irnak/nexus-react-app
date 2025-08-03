import { useState } from 'react';
import Feed from './components/Feed';
import Navbar from './components/Navbar';
import PostInput from './components/PostInput';

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // add new post at the top
  };

  return (
    <div>
      <Navbar />
      <PostInput onAddPost={addPost} /> {/* Pass the function */}
      <Feed posts={posts} />            {/* Pass posts */}
    </div>
  );
}

export default App;
