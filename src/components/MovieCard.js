import React, { useState } from 'react';
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
          backgroundColor: '#1c1c1c',
          color: 'white',
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: '0 8px 28px rgba(0,0,0,0.6)',
          },
          overflow: 'hidden',
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
          }, 200);
        }}
      >
        {/* Movie Poster */}
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="270"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
          />
          {/* Gradient */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "60%",
              background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
            }}
          />
          {/* Title */}
          <Box sx={{ position: "absolute", bottom: 8, left: 12, right: 8 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "#fff",
                textShadow: "0 2px 6px rgba(0,0,0,0.8)",
              }}
              noWrap
            >
              {movie.title || movie.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <Rating
                name="rating"
                value={movie.vote_average / 2}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="caption" sx={{ color: "#ccc" }}>
                {movie.vote_average?.toFixed(1)}
              </Typography>
            </Box>
          </Box>
          {/* Watchlist Button */}
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
                  '&:hover': { backgroundColor: "rgba(255,255,255,0.2)" },
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

        <CardContent sx={{ px: 1.5, py: 0.5 }}>
          <Typography variant="caption" sx={{ color: "#aaa" }}>
            {movie.release_date?.split('-')[0] || ' '}
          </Typography>
        </CardContent>
      </Card>

      {/* Hover Modal */}
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
              width: 320,
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#1e1e1e',
              boxShadow: 24,
              zIndex: 9999,
            }}
          >
            {/* Poster & Info */}
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height="400"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  p: 2,
                }}
              >
                <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
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

                <Typography variant="body2" sx={{ color: "#ccc", mb: 1 }} noWrap>
                  {movie.overview || "No description available"}
                </Typography>

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
