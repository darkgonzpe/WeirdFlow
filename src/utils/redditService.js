// utils/redditService.js
export const fetchPosts = async (subreddit = "popular", query = "") => {
  const baseUrl = query
    ? `https://www.reddit.com/r/${subreddit}/search.json?q=${query}&restrict_sr=1`
    : `https://www.reddit.com/r/${subreddit}.json`;

  try {
    const res = await fetch(baseUrl);
    const data = await res.json();

    return data.data.children.map(post => {
      const p = post.data;
    
      const invalidThumbs = ["self", "default", "nsfw", "image"];
      const isValidThumb = p.thumbnail && !invalidThumbs.includes(p.thumbnail);
    
    
        const votes = typeof p.score === "number"
        ? p.score
        : typeof p.ups === "number"
        ? p.ups
        : 0;

      
       console.log("✅ votes:", votes, " | title:", p.title, " | id:", p.id);

      return {
        id: p.id,
        title: p.title,
        author: p.author,
        category: subreddit,
        thumbnail: isValidThumb ? p.thumbnail : "/default-thumb.png",
        permalink: p.permalink,
        url: p.url,
        content: "", // no viene de Reddit
        preview: p.preview,
        votes: votes,
      };
    });
    
  } catch (error) {
    console.error("Error fetching Reddit posts:", error);
    return [];
  }
};
