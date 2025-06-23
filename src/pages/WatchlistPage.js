import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack
} from "@mui/material";
import { useWatchLater } from "../context/WatchLaterContext";
import MovieCard from "../components/MovieCard";
import { toast } from "react-toastify";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import MovieIcon from "@mui/icons-material/Movie";

const WatchListPage = () => {
  const { watchList, setWatchList } = useWatchLater();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClearAll = () => {
    setWatchList([]);
    toast.info("Watchlist cleared.");
    setConfirmOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        py: 5,
      }}
    >
      <Container sx={{ color: "white" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={4}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <PlaylistAddCheckIcon color="error" />
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              My Watchlist
            </Typography>
          </Stack>
          {watchList.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(true)}
              sx={{
                borderColor: "tomato",
                color: "tomato",
                "&:hover": {
                  backgroundColor: "tomato",
                  color: "#fff",
                },
              }}
            >
              Remove All
            </Button>
          )}
        </Stack>

        {watchList.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              color: "#aaa",
            }}
          >
            <MovieIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6">No movies added to Watchlist yet.</Typography>
            <Typography variant="body2">Start browsing and add movies to your list.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {watchList.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} isWatchlistPage={true} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Confirm Dialog */}
        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#1f1f1f",
              color: "white",
            },
          }}
        >
          <DialogTitle>Confirm Removal</DialogTitle>
          <DialogContent>
            Are you sure you want to remove all movies from your watchlist?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} sx={{ color: "#bbb" }}>
              Cancel
            </Button>
            <Button color="error" onClick={handleClearAll}>
              Remove All
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default WatchListPage;
