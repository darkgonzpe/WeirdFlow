import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
name: "users",
initialState,
reducers: {
    addUser: (state, action) => {
        const userExists = state.users.some(user => user.email === action.payload.email);
        if (!userExists) {
          state.users.push(action.payload);
        } else {
            state.error = "The user already exists";
        }
        
    },
    deleteUser: (state,action) => {
       state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state,action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
            state.users[index] = action.payload;
        }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    loginUser: (state,action) => {
      const user = state.users.find(user => user.email === action.payload.email);
       if (!user) {
                state.error = "The user does not exist";
            } else if (user.password !== action.payload.password) {
                state.error = "Incorrect password";
            } else {
                state.currentUser = user;
                state.error = null;
            }
    },
    logoutUser: (state) => {
         state.currentUser = null;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    }, 
},
});

export const { addUser, deleteUser, updateUser, setCurrentUser, loginUser, logoutUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;