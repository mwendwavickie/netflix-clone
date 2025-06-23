// MovieCard.js
import React from 'react';
import {
  Card, CardMedia, CardContent, IconButton,
  Box, Tooltip, Typography
} from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../context/WatchLaterContext';
import { toast } from 'react-toastify';

const MovieCard = ({ movie, isWatchlistPage = false }) => {
  const navigate = useNavigate();
  const { addToWatchLater, removeFromWatchLater, isInWatchList } = useWatchLater();

  const handleClick = (e) => {
    e.stopPropagation();
    if (isWatchlistPage) {
      removeFromWatchLater(movie.id);
      toast.success("Removed from Watchlist");
    } else {
      if (isInWatchList(movie.id)) {
        removeFromWatchLater(movie.id);
        toast.info("Removed from Watchlist");
      } else {
        addToWatchLater(movie);
        toast.success("Added to Watchlist");
      }
    }
  };
  return (
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
        height: '100%',
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

      {/* Remove or Watchlist toggle */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
        }}
        onClick={handleClick}
      >
        <Tooltip title={isWatchlistPage ? "Remove from Watchlist" : isInWatchList(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}>
          <IconButton sx={{ color: 'tomato' }}>
            {isWatchlistPage
              ? <Delete />
              : isInWatchList(movie.id)
                ? <Favorite />
                : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default MovieCard;
