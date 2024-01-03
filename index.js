const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/movies', (req, res) => {
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US',
            sort_by: 'popularity.desc',
            include_adult: false,
            include_video: false,
            page: 1,
          },
        }
      );
      res.json(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Call the fetchMovies function to fetch movies when a request is made
  fetchMovies();
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
