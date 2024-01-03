import React, { useState } from 'react';

const MovieSearch = ({ allMovies, onMovieClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {searchQuery &&
          filteredMovies.map((movie) => (
            <li key={movie.id} onClick={() => onMovieClick(movie)}>
              {movie.title.substring(0, searchQuery.length)}
              <span style={{ fontWeight: 'bold' }}>
                {movie.title.substring(searchQuery.length)}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
