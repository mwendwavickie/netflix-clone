import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Divider, Typography, Box } from "@mui/material";
import MovieRow from "../components/MovieRow";
import HeroBanner from "../components/HeroBanner";

// API configuration
const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Endpoints for fetching movie categories
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`;
const TOPRATED_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`;
const ACTION_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`;

const HomePage = () => {
  // State to hold fetched movie data
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);

  // Optional local watchlist (for demo/demo UX)
  const [watchList, setWatchList] = useState([]);

  // Fetch movie data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch different movie categories in parallel
        const [trendingRes, topRatedRes, actionRes] = await Promise.all([
          axios.get(TRENDING_URL),
          axios.get(TOPRATED_URL),
          axios.get(ACTION_URL),
        ]);

        // Set state with fetched results
        setTrending(trendingRes.data.results);
        setTopRated(topRatedRes.data.results);
        setActionMovies(actionRes.data.results);
      } catch (error) {
        console.error("❌ Error fetching data from TMDB API:", error);
      }
    };

    fetchData();
  }, []);

  // Add or remove a movie from local watchList
  const toggleWatchList = (movie) => {
    setWatchList((prev) =>
      prev.find((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        backgroundColor: "#111",
        minHeight: "100vh",
        paddingBottom: "40px",
        overflowX: "hidden",
      }}
    >
      {/* 🎬 Hero Banner with the top trending movie */}
      <HeroBanner movie={trending[0]} />

      {/* Movie Rows - Scrollable Sections */}
      <Box sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
        <MovieRow
          title="🔥 Trending Now"
          movies={trending}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#444" }} />

        <MovieRow
          title="⭐ Top Rated"
          movies={topRated}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />

        <Divider sx={{ my: 4, backgroundColor: "#444" }} />

        <MovieRow
          title="💥 Action Movies"
          movies={actionMovies}
          watchList={watchList}
          onWatchListToggle={toggleWatchList}
        />
      </Box>

      
    </Container>
  );
};

export default HomePage;
