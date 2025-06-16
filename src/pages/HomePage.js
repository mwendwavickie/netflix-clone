import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from 'react';
//import movieRow from "../components/movieRow";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const TRENDING_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`;

const HomePage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    //const [topRated, setTopRated] = useState([]);
    //const [actionMovies, setactionMovies] = useState([]);

    useEffect(() => {
        axios.get(TRENDING_URL)
            .then((res) => setTrendingMovies(res.data.results))
            .catch((error) => console.error("Error fetching trending movies:", error));
    }, []);

    return (
        <Container sx={{ backgroundColor: '#111', minHeight: '100vh', padding: '20px' }}maxWidth="false">
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#fff', textAlign: 'center' }}>
                Trending this week
            </Typography>

            <Grid container spacing={4}>
                {trendingMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card sx={{ backgroundColor: '#222', color: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {movie.release_date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
export default HomePage;