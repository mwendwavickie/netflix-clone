import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import MovieRow from "../components/MovieRow";

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  Thriller: 53,
  "Science Fiction": 878,
  Animation: 16,
  Documentary: 99,
  Fantasy: 14,
  Mystery: 9648,
};

const MoviesPage = () => {
  const [genreMovies, setGenreMovies] = useState({});
  const [pageMap, setPageMap] = useState({});
  const [loadingGenres, setLoadingGenres] = useState({});
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loadingSpecial, setLoadingSpecial] = useState(true);

  useEffect(() => {
    fetchTopRated();
    fetchNowPlaying();

    Object.keys(genreMap).forEach((genre) => {
      fetchMoviesByGenre(genre, 1);
    });
  }, []);

  const fetchTopRated = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
      );
      setTopRated(res.data.results);
    } catch (err) {
      console.error("Error fetching top rated:", err);
    } finally {
      setLoadingSpecial(false);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      );
      setNowPlaying(res.data.results);
    } catch (err) {
      console.error("Error fetching now playing:", err);
    } finally {
      setLoadingSpecial(false);
    }
  };

  const fetchMoviesByGenre = async (genre, page) => {
    try {
      setLoadingGenres((prev) => ({ ...prev, [genre]: true }));
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
    } finally {
      setLoadingGenres((prev) => ({ ...prev, [genre]: false }));
    }
  };

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
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(255, 0, 0, 0.5)",
            letterSpacing: 1,
          }}
        >
          Browse Movies
        </Typography>

        {/* Top Rated Row */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#FFD700",
              mb: 1,
              pl: 1,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Top Rated
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
          {loadingSpecial ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress color="warning" />
            </Box>
          ) : (
            <MovieRow title="" movies={topRated} />
          )}
        </Box>

        {/* Now Playing Row */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#00CED1",
              mb: 1,
              pl: 1,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Now Playing
          </Typography>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
          {loadingSpecial ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress color="info" />
            </Box>
          ) : (
            <MovieRow title="" movies={nowPlaying} />
          )}
        </Box>

        {/* Genre Rows with Horizontal Scroll on Mobile */}
        {Object.entries(genreMap).map(([genre]) => (
          <Box key={genre} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#ff6347",
                mb: 1,
                pl: 1,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {genre}
            </Typography>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />

            {loadingGenres[genre] && !genreMovies[genre] ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress color="error" />
              </Box>
            ) : (
              <Box
                sx={{
                  overflowX: { xs: "auto", md: "unset" },
                }}
              >
                <MovieRow
                  title=""
                  movies={genreMovies[genre] || []}
                  onSeeMore={() => loadMore(genre)}
                  loading={loadingGenres[genre]}
                />
              </Box>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MoviesPage;
