import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Divider, Typography, Box } from "@mui/material";
import MovieRow from "../components/MovieRow";
import HeroBanner from "../components/HeroBanner";

// API configuration
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Genre URLs
const ENDPOINTS = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  documentary: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

const HomePage = () => {
  const [movies, setMovies] = useState({
    trending: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    documentary: [],
  });

  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const responses = await Promise.all(
          Object.values(ENDPOINTS).map((url) => axios.get(url))
        );

        setMovies({
          trending: responses[0].data.results,
          topRated: responses[1].data.results,
          action: responses[2].data.results,
          comedy: responses[3].data.results,
          horror: responses[4].data.results,
          documentary: responses[5].data.results,
        });
      } catch (err) {
        console.error("Error fetching movie categories:", err);
      }
    };

    fetchMovies();
  }, []);

  const toggleWatchList = (movie) => {
    setWatchList((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#111",
        minHeight: "100vh",
        paddingBottom: "60px",
        overflowX: "hidden",
      }}
    >
      <HeroBanner movie={movies.trending[0]} />

      <Box sx={{ px: { xs: 2, sm: 3, md: 8 }, mt: 4 }}>
        <MovieRow
          title="Trending Now"
          movies={movies.trending}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#333" }} />

        <MovieRow
          title="Top Rated"
          movies={movies.topRated}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#333" }} />

        <MovieRow
          title="Action Movies"
          movies={movies.action}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#333" }} />

        <MovieRow
          title="Comedy"
          movies={movies.comedy}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#333" }} />

        <MovieRow
          title="Horror"
          movies={movies.horror}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#333" }} />

        <MovieRow
          title="Documentaries"
          movies={movies.documentary}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />
      </Box>
    </Container>
  );
};

export default HomePage;
