import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { savePostsToStorage, loadPostsFromStorage } from "../../../utils/storage";
import { fetchPosts as fetchRedditPosts } from "../../../utils/redditService";

const initialState = {
  redditPosts: [],
  localPosts: loadPostsFromStorage(),
  loading: false,
  error: null,
};

export const fetchRedditData = createAsyncThunk(
  "posts/fetchRedditData",
  async ({ subreddit = "popular", query = "" }, thunkAPI) => {
    try {
      const redditPosts = await fetchRedditPosts(subreddit, query);
      return redditPosts;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch Reddit posts");
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      const newPost = {
        id: Date.now(),
        title: action.payload.title || "Without title",
        content: action.payload.content || "Without content",
        author: action.payload.author || "Anonymous",
        category: action.payload.category || "General"
      };
      state.localPosts.push(newPost);
      savePostsToStorage(state.localPosts);
    },
    deletePost: (state, action) => {
      state.localPosts = state.localPosts.filter(post => post.id !== action.payload);
      savePostsToStorage(state.localPosts);
    },
    editPost: (state, action) => {
      const index = state.localPosts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.localPosts[index] = action.payload;
        savePostsToStorage(state.localPosts);
      } else {
        state.error = "Post no encontrado";
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedditData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRedditData.fulfilled, (state, action) => {
        const newPosts = action.payload;

        // Verificar y evitar duplicados por ID
        const existingIds = new Set(state.redditPosts.map(post => post.id));
        const filteredNewPosts = newPosts.filter(post => !existingIds.has(post.id));

        state.redditPosts = [...state.redditPosts, ...filteredNewPosts];
        state.loading = false;
      })
      .addCase(fetchRedditData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addPost, deletePost, editPost, setLoading, setError } = postSlice.actions;
export default postSlice.reducer;
