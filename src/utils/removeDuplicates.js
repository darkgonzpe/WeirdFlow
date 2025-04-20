/**
 * Remove duplicates based on title and author combination
 * @param {Array} posts - List of posts (local + reddit)
 * @returns {Array} - Filtered list without duplicates
 */
export const removeDuplicates = (posts) => {
    const seen = new Set();
  
    return posts.filter(post => {
      const key = `${post.title}-${post.author}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  