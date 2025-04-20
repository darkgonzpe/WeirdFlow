import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../app/features/posts/postSlice';
import "../styles/PostForm.css"

const savePostToStorage = (newPost) => {
  const stored = JSON.parse(localStorage.getItem("localPosts")) || [];
  const updated = [newPost, ...stored];
  localStorage.setItem("localPosts", JSON.stringify(updated));
};

const PostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category , setCategory] = useState("General");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        
        const newPost = {
          id: Date.now(),
          title,
          content,
          author: "Anonymous",
          category
        };
      

        dispatch(addPost({ title, content, author: "Anonymous", category }));
        savePostToStorage(newPost);
        setTitle("");
        setContent("");
        setCategory("General");
    };
    
    
    return (
        <form onSubmit={handleSubmit} className='post-form'>
           <input
             type='test'
             placeholder='Title'
             value={title}
             onChange={(e) => setTitle(e.target.value)}
           />
           <textarea 
            placeholder='Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
           />

         <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Memes">Memes</option>
                <option value="Curiosities">Curiosities</option>
                <option value="Weird">Weird</option>
           </select>

           <button type="submit">Add Post</button>
        </form>
    );
};

export default PostForm;