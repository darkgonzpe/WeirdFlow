import React  from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

const CategoryPage = () => {
    const { categoryName } = useParams();
  const posts = useSelector((state) => state.posts.posts);


// We normalize comparison to avoid capitalization problems:

const filteredPosts = posts.filter(
    (post) => post.category.toLowerCase() === categoryName.toLowerCase()
);

return (
    <div style={{ padding: "1rem" }}>
      <h2>📂 Category: {categoryName}</h2>
      <p>Total posts: {filteredPosts.length}</p>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts found in this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;