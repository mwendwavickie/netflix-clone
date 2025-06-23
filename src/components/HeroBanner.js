import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroBanner = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "60vh", md: "80vh" },
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        px: { xs: 3, md: 10 },
      }}
    >
      {/* Dark overlay gradient for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to right, rgba(17,17,17,0.95) 30%, rgba(17,17,17,0.5) 80%, rgba(0,0,0,0))",
          zIndex: 1,
        }}
      />

      {/* Movie details */}
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2, lineHeight: 1.2 }}
        >
          {movie.title || movie.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: "rgba(255,255,255,0.9)",
            display: { xs: "none", sm: "block" },
          }}
        >
          {movie.overview?.length > 200
            ? movie.overview.slice(0, 200) + "..."
            : movie.overview}
        </Typography>

        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => navigate(`/movie/${movie.id}`)}
          sx={{
            px: 4,
            py: 1,
            fontWeight: "bold",
            borderRadius: "50px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            "&:hover": {
              backgroundColor: "#ff2e2e",
            },
          }}
        >
          ▶ Watch Now
        </Button>
      </Box>
    </Box>
  );
};

export default HeroBanner;
