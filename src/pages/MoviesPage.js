import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, Divider } from "@mui/material";
import MovieRow from "../components/MovieRow";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

// Genre mapping
const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
};

const MoviesPage = () => {
  const [genreMovies, setGenreMovies] = useState({});
  const [pageMap, setPageMap] = useState({});

  useEffect(() => {
    Object.keys(genreMap).forEach((genre) => {
      fetchMoviesByGenre(genre, 1);
    });
  }, []);

  // Fetch movies by genre and page
  const fetchMoviesByGenre = async (genre, page) => {
    try {
      const genreId = genreMap[genre];
      const res = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
      );
      setGenreMovies((prev) => ({
        ...prev,
        [genre]:
          page === 1
            ? res.data.results
            : [...(prev[genre] || []), ...res.data.results],
      }));
      setPageMap((prev) => ({ ...prev, [genre]: page }));
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Handle loading more movies
  const loadMore = (genre) => {
    const nextPage = (pageMap[genre] || 1) + 1;
    fetchMoviesByGenre(genre, nextPage);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "white",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(255, 0, 0, 0.5)",
          }}
        >
          Browse by Genre
        </Typography>

        {Object.entries(genreMap).map(([genre]) => (
          <Box key={genre} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "tomato",
                mb: 1,
                pl: 1,
              }}
            >
              {genre}
            </Typography>
            <Divider
              sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }}
            />

            <MovieRow
              title=""
              movies={genreMovies[genre] || []}
              onSeeMore={() => loadMore(genre)}
              loading={!genreMovies[genre]}
            />
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MoviesPage;
