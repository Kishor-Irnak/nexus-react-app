import PostCard from "./PostCard";

function Feed({ posts }) {
  return (
    <div className="container d-flex flex-column align-items-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
