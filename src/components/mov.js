
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie',
          {
            params: {
              api_key: 'bca0b27dc3c2608802db6d8d9bf57c06',
              language: 'en-US',
              sort_by: 'popularity.desc',
              include_adult: false,
              include_video: false,
              page: 1,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
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
