import { useState } from "react";
import Navbar from "./components/Navbar";
import PostInput from "./components/PostInput";
import PostCard from "./components/PostCard";

function App() {
  const [reload, setReload] = useState(false);

  const handlePost = () => {
    setReload(!reload); // trigger re-render of PostCard
  };

  return (
    <div>
      <Navbar />
      <PostInput onPost={handlePost} />
      <PostCard />
    </div>
  );
}

export default App;
