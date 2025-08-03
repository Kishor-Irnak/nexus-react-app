import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "./PostCard"; // Ensure correct path

function Feed({ posts = [] }) { // Default empty array for safety
  const [firebasePosts, setFirebasePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "posts"), 
        orderBy("createdAt", "desc")
      );
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFirebasePosts(data);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore error:", err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Setup error:", err);
      setError(err);
      setLoading(false);
    }
  }, []);

  // Determine which posts to display
  const displayPosts = firebasePosts.length > 0 ? firebasePosts : posts;

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