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
        backgroundColor: '#111',
        color: 'white',
        flex: '0 0 auto',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        "&:hover": {
          transform: "scale(1.05)",
        },
        overflow: 'hidden',
        height: '100%',
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Movie Poster */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="270"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />

        {/* Overlay Gradient */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "50%",
            background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          }}
        />

        {/* Title Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
            zIndex: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "#fff",
              textShadow: "0 0 5px rgba(0,0,0,0.8)",
            }}
            noWrap
          >
            {movie.title || movie.name}
          </Typography>
        </Box>

        {/* Action Icon */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 3,
          }}
          onClick={handleClick}
        >
          <Tooltip
            title={
              isWatchlistPage
                ? "Remove from Watchlist"
                : isInWatchList(movie.id)
                ? "Remove from Watchlist"
                : "Add to Watchlist"
            }
          >
            <IconButton
              sx={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: 'tomato',
                '&:hover': {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              {isWatchlistPage
                ? <Delete />
                : isInWatchList(movie.id)
                  ? <Favorite />
                  : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Optional Extra Details (genres or year) */}
      <CardContent sx={{ padding: 1 }}>
        <Typography variant="caption" sx={{ color: "#bbb" }}>
          {movie.release_date?.split('-')[0] || ' '}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
