// components/PostCard.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, editPost } from "../app/features/posts/postSlice";
import { Link } from 'react-router-dom';
import "../styles/PostCard.css";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const isLocalPost = post.hasOwnProperty('content') && post.permalink === undefined;

  console.log("🔍 Post ID:", post.id);
  console.log("🧠 isLocalPost:", isLocalPost);
  console.log("📊 post.votes:", post.votes);


  console.log('Post ID:', post.id);
  console.log('isLocalPost:', isLocalPost);
  console.log('post:', post);


  const [editedPost, setEditedPost] = useState({
    title: post.title,
    content: post.content || "",
    author: post.author,
    category: post.category || "General"
  });

  const [localVotes, setLocalVotes] = useState(post.votes || 0);

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost({ ...editedPost, id: post.id }));
    setIsEditing(false);
  };

  const previewImage = post.preview?.images?.[0]?.source?.url?.replaceAll("&amp;", "&");

  const handleUpvote = () => {
    if (isLocalPost) setLocalVotes((prev) => prev + 1);
  };

  const handleDownvote = () => {
    if (isLocalPost) setLocalVotes((prev) => prev - 1);
  };

  return (
    <div className={`post-card ${isLocalPost ? 'local-post' : 'reddit-post'}`}>
      <span className={`post-type-label ${isLocalPost ? 'local-label' : 'reddit-label'}`}>
        {isLocalPost ? '🌱 WeirdFlow Post' : '👽 From Reddit'}
      </span>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className='edit-form'>
          <div className="form-row">
            <input
              name="title"
              value={editedPost.title}
              onChange={handleEditChange}
              placeholder="Title"
            />
            <input
              name="author"
              value={editedPost.author}
              onChange={handleEditChange}
              placeholder="Author"
            />
            <select
              name="category"
              value={editedPost.category}
              onChange={handleEditChange}
            >
              <option value="General">General</option>
              <option value="Memes">Memes</option>
              <option value="Curiosities">Curiosities</option>
              <option value="Weird">Weird</option>
            </select>
          </div>
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleEditChange}
            placeholder="Content"
          />
          <div className="form-actions">
            <button type="submit">💾 Save</button>
            <button type="button" onClick={handleEditToggle}>❌ Cancel</button>
          </div>
        </form>
      ) : (
        <div className="post-body">
          <div className="post-votes">
            <button className="vote-btn" onClick={handleUpvote}>⬆️</button>
            <span className="vote-count">
              {isLocalPost ? localVotes : (post.votes ?? 0)}
            </span>
            <button className="vote-btn" onClick={handleDownvote}>⬇️</button>
          </div>

          <div className="post-content">
            <div className="post-header">
              <h3>{post.title}</h3>
              <Link
                to={`/category/${post.category}`}
                className={`category-pill ${post.category.toLowerCase()}-pill`}
              >
                {post.category === "General" && "📢 General"}
                {post.category === "Memes" && "🤣 Memes"}
                {post.category === "Curiosities" && "🧠 Curiosities"}
                {post.category === "Weird" && "🤪 Weird"}
                {!["General", "Memes", "Curiosities", "Weird"].includes(post.category) && `🌐 ${post.category}`}
              </Link>
            </div>

            {previewImage && (
              <img src={previewImage} alt="Post preview" className="post-thumbnail" />
            )}

            {!previewImage && post.thumbnail &&
              post.thumbnail !== "self" &&
              post.thumbnail !== "default" &&
              post.thumbnail !== "nsfw" && (
                <img src={post.thumbnail} alt="Thumbnail fallback" className="post-thumbnail" />
            )}

            {post.content && <p>{post.content}</p>}

            <small>
              By <Link to={`/user/${post.author}`} className="author-link">{post.author}</Link>
            </small>

            {post.permalink && (
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="reddit-link"
              >
                🌐 see on reddit
              </a>
            )}

            {isLocalPost && (
              <div className='post-actions'>
                <button onClick={handleEditToggle}>✏️ Edit</button>
                <button onClick={handleDelete}>🗑️ Delete</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
