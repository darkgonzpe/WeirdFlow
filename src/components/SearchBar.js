import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search posts..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button className="clear-btn" onClick={onClearSearch}>
          ❌
        </button>
      )}
    </div>
  );
};

export default SearchBar;
