// src/services/localDb.js
const DB_NAME = 'nexus-react-app-db';

const getDB = () => {
  const db = localStorage.getItem(DB_NAME);
  return db ? JSON.parse(db) : { posts: [] };
};

const saveDB = (data) => {
  localStorage.setItem(DB_NAME, JSON.stringify(data));
};

export const localDb = {
  async addPost(post) {
    const db = getDB();
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: []
    };
    db.posts.unshift(newPost);
    saveDB(db);
    return newPost;
  },

  async getPosts() {
    return getDB().posts;
  },

  async addComment(postId, commentText) {
    const db = getDB();
    const post = db.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push(commentText);
      saveDB(db);
    }
  }
};