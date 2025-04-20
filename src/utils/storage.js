const STORAGE_KEY = "weirdflow_posts";

export const savePostsToStorage = (posts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const loadPostsFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}
