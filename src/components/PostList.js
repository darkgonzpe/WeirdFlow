import React from "react";
import PostCard from "./PostCard";
import "../styles/PostList.css";

const PostList = ({ posts = [], searchTerm = "" }) => {
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!posts.length) return <p className="loading">Loading Reddit posts...</p>;

  return (
    <div className="post-list-container">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="no-posts">No posts found matching your search.</p>
      )}
    </div>
  );
};

export default PostList;
