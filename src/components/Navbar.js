import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
     <nav className='navbar'>
       <h2 className='logo'>WeirdFlow</h2>
       <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/user'>My account</Link></li>
       </ul>
     </nav>
    );
};

export default Navbar;