// src/services/fileDb.js
const DB_KEY = 'nexus-react-app-db';

// Initialize database
const initializeDb = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify({
      posts: [],
      lastUpdated: new Date().toISOString()
    }));
  }
};

initializeDb();

const readDb = () => {
  try {
    const data = localStorage.getItem(DB_KEY);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading DB:', err);
    return { 
      posts: [],
      lastUpdated: new Date().toISOString()
    };
  }
};

const writeDb = (data) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify({
      ...data,
      lastUpdated: new Date().toISOString()
    }));
    return true;
  } catch (err) {
    console.error('Error writing to DB:', err);
    return false;
  }
};

export const fileDb = {
  async getPosts() {
    const db = readDb();
    return db.posts || [];
  },

  async getPost(postId) {
    const db = readDb();
    return db.posts.find(p => p.id === postId) || null;
  },

  async addPost(post) {
    const db = readDb();
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
      likes: 0
    };
    
    db.posts.unshift(newPost);
    return writeDb(db) ? newPost : null;
  },

  async addComment(postId, commentText) {
    const db = readDb();
    const post = db.posts.find(p => p.id === postId);
    
    if (!post) return false;
    
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      createdAt: new Date().toISOString()
    };
    
    post.comments.push(newComment);
    return writeDb(db) ? newComment : null;
  },

  async deleteComment(postId, commentId) {
    const db = readDb();
    const post = db.posts.find(p => p.id === postId);
    
    if (!post) return false;
    
    const initialLength = post.comments.length;
    post.comments = post.comments.filter(c => c.id !== commentId);
    
    if (post.comments.length !== initialLength) {
      return writeDb(db);
    }
    return false;
  },

  async deletePost(postId) {
    const db = readDb();
    const initialLength = db.posts.length;
    db.posts = db.posts.filter(post => post.id !== postId);
    
    if (db.posts.length !== initialLength) {
      return writeDb(db);
    }
    return false;
  },

  async likePost(postId) {
    const db = readDb();
    const post = db.posts.find(p => p.id === postId);
    
    if (!post) return false;
    
    post.likes = (post.likes || 0) + 1;
    return writeDb(db) ? post.likes : null;
  },

  async clearAllPosts() {
    return writeDb({ posts: [] });
  }
};