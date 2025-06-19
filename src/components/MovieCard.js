import React from 'react';
import { Card, CardMedia, CardContent, IconButton, Box, Tooltip, Typography } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../context/WatchLaterContext';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { addToWatchLater, removeFromWatchLater, isInWatchList, } = useWatchLater();

    const handleToggle = (e) => {
        e.stopPropagation(); // Prevent navigating to detail
        if (isInWatchList(movie.id)) {
          removeFromWatchLater(movie.id);
        } else {
          addToWatchLater(movie);
        }
      };

    return(
        <Card
            sx={{
                minWidth: 180,
                backgroundColor: '#222',
                color: 'white',
                flex: '0 0 auto',
                position: 'relative',
                cursor: 'pointer',
                "&:hover": { transform: "scale(1.05)" },
                transition: "transform 0.2s",
            }}
            onClick={() => navigate(`/movie/${movie.id}`)}
        >
            <CardMedia
                component="img"
                height="270"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
            />

            <CardContent sx={{ padding: 1 }}>
                <Typography variant="body2" noWrap>
                    {movie.title || movie.name}
                </Typography>
            </CardContent>
                        

            {/* Watch Later Heart Icon */}
            <Box
                sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 2,
                }}
                onClick={handleToggle}
            >
                <Tooltip
                title={isInWatchList(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                >
                <IconButton sx={{ color: 'tomato' }}>
                    {isInWatchList(movie.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                </Tooltip>
            </Box>
        </Card>
    );

    }
export default MovieCard;