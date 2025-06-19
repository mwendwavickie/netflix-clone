import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import MovieCard from './MovieCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MovieRow = ({title, movies, watchList, onWatchListToggle, onSeeMore }) => {
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
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                {/* Right arrow button */}
                {onSeeMore && (
                <IconButton
                    onClick={onSeeMore}
                    sx={{
                    minWidth: 50,
                    height: 50,
                    alignSelf: 'center',
                    color: 'white',
                    border: '1px solid #555',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
                )}
            </Box>
        </Box>
    )

}
export default MovieRow;