import React, {useState, useEffect} from "react";
import axios from "axios";
import {Container, Box, IconButton} from '@mui/material';
import MovieRow from "../components/MovieRow";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Romance: 10749,
}

const MoviesPage = () => {
    const [genreMovies, setGenreMovies] = useState({});
    const [pageMap, setPageMap] = useState({});

    useEffect(() => {
        Object.keys(genreMap).forEach((genre) => {
            fetchMoviesByGenre(genre, 1);
          });
    }, []);

    const fetchMoviesByGenre = async(genre, page) => {
        try{
            const genreId = genreMap[genre];
            const res = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
            );
            setGenreMovies((prev) => ({
                ...prev,
                [genre]: page === 1
                ? res.data.results
                : [...(prev[genre] || []), ...res.data.results],
            }));
            setPageMap((prev) => ({ ...prev, [genre]: page }));

        } catch(err) {
            console.error("Error fetching movies:", err);
        }
    };

    const loadMore = (genre) => {
        const nextPage = (pageMap[genre] || 1) + 1;
        fetchMoviesByGenre(genre, nextPage);
    };

    return (
    <Box sx={{ backgroundColor: "#141414", minHeight: "100vh", color: "white", py: 4 }}>
        <Container>
            {Object.entries(genreMap).map(([genre]) => (
                <Box key={genre}>
                    <MovieRow
                    title={genre}
                    movies={genreMovies[genre] || []}
                    onSeeMore={() => loadMore(genre)} // Pass the handler here
                    loading={!genreMovies[genre]} // Pass loading flag
                    />
                </Box>
            ))}
        </Container>
    </Box>
    )

}
export default MoviesPage;
