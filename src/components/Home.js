import React, { useState, useEffect } from 'react';
import './style.css';

const Home = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('isDarkTheme') === 'true'
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
    localStorage.setItem('isDarkTheme', isDarkTheme);
  }, [isDarkTheme]);

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

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleDarkMode = () => {
    setIsDarkTheme((previousState) => !previousState);
  };

  return (
    <div className='general'>
      <div className={isDarkTheme ? 'darkMode' : 'lightMode'}>
        <button onClick={handleDarkMode} className='btn'>
          {isDarkTheme ? 'light' : 'dark'}
        </button>
        <h1 style={{ margin: '10px 15px', fontSize: '2.5rem' }}>Golango</h1>
        <p style={{ margin: '30px 15px', fontSize: '1.5rem' }}>
          Watch your favourite movie's trailer
        </p>
        <div className='searchBar'>
          <input
            type='text'
            placeholder='Search by movie title'
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <ul className='movies-list'>
          {(filteredMovies ?? []).map((movie) => (
            <li key={movie.id} className='movie-item'>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className='movie-poster'
                onClick={() => onMovieClick(movie.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
