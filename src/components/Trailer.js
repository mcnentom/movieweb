// Trailer.js
import React, { useEffect, useState } from 'react';
import './style.css'
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
  const backgroundStyle = {
    backgroundImage: movieDetails ? `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Adjust as needed
    display: 'flex',
    flexDirection: 'column',
    gap:'1rem',
    justifyContent: 'center',
    textAlign: 'left',
    padding: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    position:'relative'
  };
 
  const textOverlayStyle = {
    position: 'absolute',
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    color: '#fff', // White text for contrast
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%', // Cover the entire width
    height: '100%', // Cover the entire height
    boxSizing: 'border-box',
    
  };
  return (
    <div style={backgroundStyle} className='trailerGeneral'>
      <div style={textOverlayStyle}>
        {movieDetails ? (
          <>
            <h2 style={{margin :'30px 0 '}}>{`${movieDetails.title}`}</h2>
            {movieDetails.vote_average && <p style={{margin :'10px 0 '}}>{`Rating: ${movieDetails.vote_average}`}</p>}
            {movieDetails.description && <p style={{margin :'10px 0 '}}>{`Description: ${movieDetails.description}`}</p>}
          </>
        ) : (
          <h2>Loading...</h2>
        )}
        <button
          onClick={onBack}
          style={{ position: 'absolute', top: '10px', left: '20px', zIndex: '1',  }}
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
            style={{ marginTop: '20px' ,border: 'none' }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Trailer;
