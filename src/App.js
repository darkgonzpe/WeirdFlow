import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import CategoryPage from './pages/CategoryPage';
import './styles/App.css';
import './styles/darkmode.css';


function App() {
  return (
    <Router>
      <Navbar />
    <div className='container'>
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route path ='/post/:id' element={<PostDetail />} />
        <Route path='/user/:username' element={<UserProfile />} />
        <Route path ='category/:categoryName' element={<CategoryPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
