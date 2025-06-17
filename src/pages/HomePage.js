import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import MovieRow from "../components/MovieRow";
import HeroBanner from "../components/HeroBanner";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`;
const TOPRATED_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`;
const ACTION_URL = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US`;

const HomePage = () => {
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from TMDB API
                const trendingRes = await axios.get(TRENDING_URL);
                const topRatedRes = await axios.get(TOPRATED_URL);
                const actionRes = await axios.get(ACTION_URL);
                // Set the state with the fetched data

                setTrending(trendingRes.data.results);
                setTopRated(topRatedRes.data.results);
                setActionMovies(actionRes.data.results);
            } catch (error) {
                console.error("Error fetching data from TMDB API:", error);
            }
        };
        fetchData();
        
    }, []);

    const toggleWatchList = (movie) => {
        setWatchList((prev) => {
            if (prev.find((m) => m.id === movie.id)) {
                return prev.filter((m) => m.id !== movie.id);
            } else {
                return [...prev, movie];
            }
        });
    };

    return (
        <Container 
        sx={{ 
            backgroundColor: '#111', 
            minHeight: '100vh', 
            padding: '20px' 
        }}
        maxWidth="false"
        >
            <HeroBanner movie={trending[0]} />
            <MovieRow title="Trending Now" movies={trending} watchList={watchList} onWatchListToggle={toggleWatchList} />
            <MovieRow title="Top Rated" movies={topRated} watchList={watchList} onWatchListToggle={toggleWatchList} />
            <MovieRow title="Action Movies" movies={actionMovies} watchList={watchList} onWatchListToggle={toggleWatchList} />

        </Container>
    )
}
export default HomePage;