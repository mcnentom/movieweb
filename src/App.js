// App.js
import React, { useState } from 'react';
import Home from './components/Home';
import Trailer from './components/Trailer';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
  };

  const handleBackToHome = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {selectedMovie ? (
        <Trailer movieId={selectedMovie} onBack={handleBackToHome} />
      ) : (
        <Home onMovieClick={handleMovieClick} />
      )}
    </div>
  );
};

export default App;
