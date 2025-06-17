import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Stack, Chip, Button, } from "@mui/material";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185/";

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        // Fetch movie details
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => {
                console.log("Movie data:", res.data);
                setMovie(res.data);
            })
            .catch(error => console.error("Error fetching movie details:", error));      
    }, [id]);

    if (!movie) return <Typography sx={{ color: 'white' }}>Loading movie details...</Typography>;

    
    return (
        <Container sx={{ color: "black", paddingY: 4 }}>
      {/* Banner */}
      <Box
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          mb: 4,
          height: { xs: 200, sm: 300, md: 400 },
          display: "flex",
          alignItems: "flex-end",
          p: 2,
        }}
      >
        <Typography variant="h3" sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.6)", px: 2, py: 1, borderRadius: 1 }}>
          {movie.title}
        </Typography>
      </Box>

      {/* Movie Info */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {/* Poster */}
        <Box component="img"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          sx={{ width: { xs: "100%", sm: "300px" }, borderRadius: 2 }}
        />

        {/* Details */}
        <Box>
          <Typography variant="h5" gutterBottom>Overview</Typography>
          <Typography variant="body1" paragraph>{movie.overview || "No overview available."}</Typography>

          <Typography><strong>Release Date:</strong> {movie.release_date}</Typography>
          <Typography><strong>Runtime:</strong> {movie.runtime} minutes</Typography>
          <Typography><strong>Rating:</strong> {movie.vote_average}/10</Typography>

          <Box sx={{ my: 2 }}>
            <Typography gutterBottom><strong>Genres:</strong></Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {movie.genres?.map((genre) => (
                <Chip key={genre.id} label={genre.name} color="primary" />
              ))}
            </Stack>
          </Box>

          <Button variant="contained" color="secondary">Add to Watchlist</Button>
        </Box>
      </Stack>
    </Container>
    )
}
export default MovieDetailPage;