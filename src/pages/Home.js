import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRedditData } from '../app/features/posts/postSlice';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import { removeDuplicates } from '../utils/removeDuplicates';


const Home = () => {
  const dispatch = useDispatch();
  const { redditPosts, localPosts, loading, error } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const trimmed = searchTerm.trim();
  
    // Solo busca si no está cargado y no hay búsqueda
    if (redditPosts.length === 0 && trimmed === "") {
      dispatch(fetchRedditData({ subreddit: "popular", query: "" }));
    }
  
    // Si hay búsqueda, busca por término
    if (trimmed !== "") {
      dispatch(fetchRedditData({ subreddit: "popular", query: trimmed }));
    }
  
  }, [dispatch, searchTerm, redditPosts.length]);
  

  // ✅ Combine without duplicating
  const combinedPosts = useMemo(() => {
    const all = [...localPosts, ...redditPosts];
    return removeDuplicates(all);
     }, [localPosts, redditPosts]);

  return (
    <div className='home-page'>
      <h1 className='title-main'>Welcome to WeirdFlow 🔥</h1>
      <h2 className='title-sub'>Share your weirdest ideas and memes!</h2>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearSearch={handleClearSearch}
      />

      {loading && <p>Loading Reddit posts...</p>}
      {error && <p className="error">{error}</p>}

      <PostForm />
      <PostList posts={combinedPosts} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
