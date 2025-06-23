import React from 'react';
import {
  Typography,
  Box,
  IconButton,
  Skeleton,
  Tooltip
} from '@mui/material';
import MovieCard from './MovieCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MovieRow = ({ title, movies = [], onSeeMore, loading }) => {
  const isLoading = loading || movies.length === 0;

  return (
    <Box sx={{ mb: 5 }}>
      {/* Section Title */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 'bold' }}>
          {title}
        </Typography>

        {/* Optional See More icon on header */}
        {!isLoading && onSeeMore && (
          <Tooltip title="See more">
            <IconButton
              onClick={onSeeMore}
              sx={{
                color: '#fff',
                border: '1px solid #555',
                '&:hover': { backgroundColor: '#333' },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Horizontal Scrollable Movie Row */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          paddingY: 1,
          gap: 2,
          pr: 2,
          '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
        }}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={180}
                height={270}
                sx={{ borderRadius: 2, backgroundColor: "#444", flex: '0 0 auto' }}
              />
            ))
          : movies.length > 0
            ? movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            : (
              <Typography sx={{ color: '#bbb' }}>No movies to display.</Typography>
            )}
      </Box>
    </Box>
  );
};

export default MovieRow;
