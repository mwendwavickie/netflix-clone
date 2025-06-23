import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Skeleton,
  Box
} from "@mui/material";
import MovieCard from "../components/MovieCard";
import SearchIcon from "@mui/icons-material/Search";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
        .then((res) => {
          setResults(res.data.results || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", py: 5 }}>
      <Container sx={{ color: "white" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          🔍 Results for "{query}"
        </Typography>

        {loading ? (
          <Grid container spacing={2}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Grid item xs={6} sm={4} md={3} key={idx}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={270}
                  sx={{ borderRadius: 2, backgroundColor: "#333" }}
                />
              </Grid>
            ))}
          </Grid>
        ) : results.length > 0 ? (
          <Grid container spacing={2}>
            {results.map((movie) => (
              <Grid item xs={6} sm={4} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <SearchIcon sx={{ fontSize: 60, color: "#666" }} />
            <Typography variant="h6" sx={{ mt: 2, color: "#aaa" }}>
              No results found for "{query}"
            </Typography>
            <Typography variant="body2" sx={{ color: "#777" }}>
              Try searching for something else.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage;
