import { useEffect, useState } from "react";
import { fileDb } from "../services/fileDb"; // Changed from localDb to fileDb
import PostCard from "./PostCard";

function Feed({ posts = [] }) {
  const [localPosts, setLocalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const loadedPosts = await fileDb.getPosts(); // Changed to fileDb
        setLocalPosts(loadedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error loading posts:", err);
        setError(err);
        setLoading(false);
      }
    };

    loadPosts();

    // Optional: Set up a listener for file changes (if using file watcher)
    // Note: This is different from localStorage event listener
    const intervalId = setInterval(() => {
      loadPosts();
    }, 5000); // Check for updates every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Determine which posts to display
  const displayPosts = localPosts.length > 0 ? localPosts : posts;

  if (loading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-danger">
        Error loading posts: {error.message}
      </div>
    );
  }

  if (displayPosts.length === 0) {
    return <div className="text-center py-4">No posts available yet.</div>;
  }

  return (
    <div className="container d-flex flex-column align-items-center gap-3">
      {displayPosts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          className="w-100" 
        />
      ))}
    </div>
  );
}

export default Feed;