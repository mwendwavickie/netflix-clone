import React from 'react';
import { Card, CardMedia, IconButton, Box, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie, onWatchListToggle, isInWatchList }) => {
    const navigate = useNavigate();

    return(
        <Card
            sx={{
                minWidth: 180,
                backgroundColor: '#222',
                color: 'white',
                flex: '0 0 auto',
                position: 'relative',
                cursor: 'pointer',
                '&:hover .hoverIcon': {opacity:1},
            }}
            onClick={() => navigate(`/movie/${movie.id}`)}
        >
            <CardMedia
                component="img"
                height="270"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
            />

            <Box
                className="hoverIcon"
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 1,
                }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onWatchListToggle(movie.id);
                }}
            >
                <Tooltip title={isInWatchList(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}>
                    <IconButton sx={{ color: 'tomato' }}>
                        {isInWatchList(movie.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Card>
    );

    }
export default MovieCard;