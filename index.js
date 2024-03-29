const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 8000;

app.use(cors());
app.get('/movies', async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const totalPages = 5; // Set the number of pages you want to fetch

    // Create an array of page numbers
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Initialize an array to store the responses
    const responses = [];

    // Use a loop to make requests for each page
    for (const page of pageNumbers) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );

      responses.push(response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        vote_average: movie.vote_average,
        description: movie.overview,
        poster_path: movie.poster_path,
      })));
    }

    // Flatten the responses array to a single array of movies
    const movies = [].concat(...responses);

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies/:id', async (req, res) => {
  const movieId = req.params.id;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );

    const movieDetails = {
      title: response.data.title,
      vote_average: response.data.vote_average,
      description: response.data.overview,
      poster_path: response.data.poster_path,
    };

    res.json(movieDetails);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/movies/:id/trailer', async (req, res) => {
  const movieId = req.params.id;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
    );
    
    const trailer = response.data.results.find((video) => video.type === 'Trailer');

    res.json(trailer ? [trailer] : []);
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
