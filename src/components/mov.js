import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieSearch from './search';

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8000/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (selectedMovie) => {
    // Add logic to navigate to the selected movie's page
    console.log('Navigating to:', selectedMovie.title);
  };

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieSearch allMovies={movies} onMovieClick={handleMovieClick} />
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Vote Average: {movie.vote_average}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <button
                onClick={() => {
                  // Add logic to handle watching online
                  console.log('Watch Online:', movie.title);
                }}
              >
                Watch Online
              </button>
              <button
                onClick={() => {
                  // Add logic to handle downloading
                  console.log('Download:', movie.title);
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
