import React from "react";
import { Container, Typography, Grid, } from '@mui/material';
import { useWatchLater } from '../context/WatchLaterContext';
import MovieCard from "../components/MovieCard";

const WatchlistPage = () => {
    const { watchList } = useWatchLater();
    console.log("WatchListContents: ",watchList);

    return (
        <Container sx={{ 
            py: 5, 
            color: 'white',
            backgroundColor: '#111', 
            minHeight: '100vh', 
            padding: '20px' 
            }} 
            >
            <Typography variant="h4" gutterBottom>
                My WatchList
            </Typography>

            {watchList?.length === 0 ? (
                <Typography>No movies added to yet.</Typography>
            ) : (
                <Grid container spacing={2}>
                {watchList?.map((movie) => (
                    <Grid item key={movie.id} xs={6} sm={4} md={3}>
                    <MovieCard movie={movie} />
                    </Grid>
                ))}
                </Grid>
      )}
        </Container>
    )
}
export default WatchlistPage;
