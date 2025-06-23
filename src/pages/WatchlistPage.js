import React, { useState } from "react";
import { Container, Typography, Grid, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useWatchLater } from "../context/WatchLaterContext";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";

const WatchListPage = () => {
  const { watchList, setWatchList } = useWatchLater();
  const [confirmOpen, setConfirmOpen ] = useState(false);

  const handleClearAll = () => {
    setWatchList([]);
    toast.info("Watchlist cleared.");
    setConfirmOpen(false);
  };

  return (
    <Container sx={{ py: 5, color: 'white' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
        <Typography variant="h4" gutterBottom>
          My Watchlist
        </Typography>
        {watchList.length > 0 && (
          <Button variant="outlined" color="error" onClick={() => setConfirmOpen(true)}>
            Remove All
          </Button>
        )}
      </Box>

      {watchList.length === 0 ? (
        <Typography>No movies added to Watchlist yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {watchList.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} isWatchlistPage={true} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          Are you sure you want to remove all movies from your watchlist?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleClearAll}>Remove All</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WatchListPage;
