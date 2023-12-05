import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** Renders a single row in the List Courses table. See pages/ListCourses.jsx. */
const SearchBarCourse = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // };

  const handleSearch = () => {
    // Navigate to ListCourses page with query parameter
    navigate(`/searchcourse?query=${query}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <form>
      <input
        type="search"
        placeholder="Search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchBarCourse;
