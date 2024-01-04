import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieTrailer from './Trailer'; // Import the MovieTrailer component

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details from your server (replace with your actual backend endpoint)
        const response = await axios.get(`http://localhost:8000/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <MovieTrailer movieId={id} /> {/* Pass the movie ID to MovieTrailer */}
      <p>{movie.overview}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetails;
