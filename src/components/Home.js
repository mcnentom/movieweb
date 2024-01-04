// Home.js
import React, { useState, useEffect } from 'react';

const Home = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {(movies ?? []).map((movie) => (
          <li key={movie.id} style={{ margin: '10px', display: 'inline-block' }}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '200px', cursor: 'pointer' }}
              onClick={() => onMovieClick(movie.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
