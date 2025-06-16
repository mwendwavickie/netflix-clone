import React from 'react';
import { Typography, Box } from '@mui/material';
import MovieCard from './MovieCard';

const MovieRow = ({title, movies, watchList, onWatchListToggle }) => {
    return (
        <Box sx={{ marginBottom: 4 }}>

            <Typography variant="h5" component="h2" sx={{ color: '#fff', marginBottom: 2 }}>
                {title}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    paddingY: 1,
                    gap: 2,
                    '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
                }} 
            >
                {movies?.map((movie)=> (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onWatchListToggle={onWatchListToggle} 
                        isInWatchList={(id) => watchList.includes(id)}
                    />
                ))}
            </Box>
        </Box>
    )

}
export default MovieRow;