import React, { useState, useRef } from 'react';
import {
  Card, CardMedia, CardContent, IconButton,
  Box, Tooltip, Typography, Rating, Modal, Fade, Button
} from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWatchLater } from '../context/WatchLaterContext';
import { toast } from 'react-toastify';

const MovieCard = ({ movie, isWatchlistPage = false }) => {
  const navigate = useNavigate();
  const { addToWatchLater, removeFromWatchLater, isInWatchList } = useWatchLater();

  const [openModal, setOpenModal] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHoveringModal, setIsHoveringModal] = useState(false);

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

  const shouldShowModal = isHoveringCard || isHoveringModal;

  return (
    <>
      <Card
        sx={{
          minWidth: 180,
          backgroundColor: '#111',
          color: 'white',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          "&:hover": { transform: "scale(1.05)" },
          height: '100%',
        }}
        onClick={() => navigate(`/movie/${movie.id}`)}
        onMouseEnter={() => {
          setIsHoveringCard(true);
          setOpenModal(true);
        }}
        onMouseLeave={() => {
          setIsHoveringCard(false);
          setTimeout(() => {
            if (!isHoveringModal) setOpenModal(false);
          }, 200); // slight delay
        }}
      >
        {/* Poster */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="270"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "50%",
              background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
            }}
          />
          <Box sx={{ position: "absolute", bottom: 8, left: 8, right: 8, zIndex: 2 }}>
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

          {/* Action */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 3,
            }}
            onClick={handleClick}
          >
            <Tooltip title={
              isWatchlistPage
                ? "Remove from Watchlist"
                : isInWatchList(movie.id)
                ? "Remove from Watchlist"
                : "Add to Watchlist"
            }>
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

        <CardContent sx={{ padding: 1 }}>
          <Typography variant="caption" sx={{ color: "#bbb" }}>
            {movie.release_date?.split('-')[0] || ''}
          </Typography>
        </CardContent>
      </Card>

      {/* Persistent Hover Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} disableAutoFocus>
      <Fade in={shouldShowModal}>
        <Box
          onMouseEnter={() => setIsHoveringModal(true)}
          onMouseLeave={() => {
            setIsHoveringModal(false);
            setOpenModal(false);
          }}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 24,
            zIndex: 9999,
          }}
        >
          {/* Poster with Overlay */}
          <Box sx={{ position: "relative", backdropFilter: 'blur(3px)', borderRadius: 2 }}>
            <CardMedia
              component="img"
              height="400"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              
            />
            
            {/* Overlay gradient */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "50%",
                background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 2,
              }}
            >
              <Typography variant="body1" sx={{ color: "#fff", fontWeight: "bold", mb: 1 }}>
                {movie.title || movie.name}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Rating
                  name="rating"
                  value={movie.vote_average / 2}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="caption" sx={{ color: "lightgray" }}>
                  {movie.vote_average?.toFixed(1)}/10
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => navigate(`/movie/${movie.id}`)}
                sx={{ textTransform: 'none' }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
      </Modal>

    </>
  );
};

export default MovieCard;
