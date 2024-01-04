// Trailer.js
import React, { useEffect, useState } from 'react';

const Trailer = ({ movieId, onBack }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trailerResponse, detailsResponse] = await Promise.all([
          fetch(`http://localhost:8000/movies/${movieId}/trailer`),
          fetch(`http://localhost:8000/movies/${movieId}`)
        ]);

        const [trailerData, detailsData] = await Promise.all([
          trailerResponse.json(),
          detailsResponse.json()
        ]);

        const trailer = trailerData.find((video) => video.type === 'Trailer');

        if (trailer) {
          setTrailerKey(trailer.key);
          setMovieDetails(detailsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      {movieDetails ? (
        <>
          <h2>{`${movieDetails.title}`}</h2>
          <p>{`Rating: ${movieDetails.vote_average}`}</p>
          <p>{`Description: ${movieDetails.description}`}</p>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
      <button
        onClick={onBack}
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: '1' }}
      >
        Back to Home
      </button>
      {trailerKey && (
        <iframe
          title="Selected Movie Trailer"
          width="50%"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allowFullScreen
          style={{ marginTop: '20px' }}
        ></iframe>
      )}
    </div>
  );
};

export default Trailer;
