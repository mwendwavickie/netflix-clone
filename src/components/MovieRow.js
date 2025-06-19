import React from 'react';
import { Typography, Box, IconButton, Skeleton} from '@mui/material';
import MovieCard from './MovieCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MovieRow = ({title, movies, onSeeMore, loading }) => {
    const isLoading = loading || movies.length === 0;
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
                {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                        key={index}
                        variant="rectangular"
                        width={150}
                        height={225}
                        sx={{ borderRadius: 1, backgroundColor: "#444" }}
                        />
                    ))
                    : movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}

                {/* Right arrow button */}
                {!isLoading && onSeeMore && (
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