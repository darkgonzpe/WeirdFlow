import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import '../styles/UserProfile.css';
import { removeDuplicates } from '../utils/removeDuplicates';

const UserProfile = () => {
  const { username } = useParams();

  const { redditPosts, localPosts } = useSelector((state) => state.posts);

  const allPosts = [...(localPosts || []), ...(redditPosts || [])];

  // Filtrar duplicados por ID
  const uniquePosts = removeDuplicates(allPosts);

  const userPosts = uniquePosts.filter(post =>
    post.author?.toLowerCase().trim() === username.toLowerCase().trim()
  );

  const allUsers = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);

  const profileUser = allUsers.find(user => user.username === username);
  const isCurrentUser = currentUser?.username === username;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${username}`}
          alt="Avatar"
          className="avatar"
        />
        <div className="profile-info">
          <h2>👤 {username}</h2>
          <p>Total posts: {userPosts.length}</p>
          {profileUser?.email && <p>Email: {isCurrentUser ? profileUser.email : "🔒 Private"}</p>}
        </div>
      </div>

      <div className="post-section">
        <h3>📝 Posts by {username}</h3>
        {userPosts.length > 0 ? (
          userPosts.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="no-posts">This user hasn't posted anything yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
