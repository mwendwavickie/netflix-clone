import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard"; // Reuse your existing MovieCard

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => setResults(res.data.results || []))
        .catch((err) => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <Container sx={{ color: "white", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Results for "{query}"
      </Typography>
      <Grid container spacing={2}>
        {results.length > 0 ? (
          results.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        ) : (
          <Typography>No results found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
