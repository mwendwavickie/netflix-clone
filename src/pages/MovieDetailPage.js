import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import { Container, Typography, Box, Stack, Chip, Button, Card, CardMedia, CardContent } from "@mui/material";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185/";
const SIMILAR_MOVIES_URL= "https://api.themoviedb.org/3/movie/";

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        // Fetch movie details
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => {
                console.log("Movie data:", res.data);
                setMovie(res.data);
            })
            .catch(error => console.error("Error fetching movie details:", error));
            
            //fetch trailer details
            axios
            .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then(res => {
                const trailerData = res.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                console.log("Trailer data:", trailerData);
                setTrailer(trailerData);
            })
            .catch(error => console.error("Error fetching trailer details:", error));

            // Fetch cast details
            axios
            .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then(res => {
                console.log("Cast data:", res.data.cast);
                setCast(res.data.cast.slice(0, 6)); // Get top 5 cast members
            })
            .catch(error => console.error("Error fetching cast details:", error));

            //Fetch similar movies
            axios
            .get(`${SIMILAR_MOVIES_URL}${id}/similar?api_key=${API_KEY}`)
            .then((res) => setSimilar(res.data.results))
            .catch((err) => console.error("Similar fetch error:", err));

    }, [id]);
    
    // If movie data is not yet available, show a loading message
    if (!movie) return <Typography sx={{ color: 'white' }}>Loading movie details...</Typography>;

    
    return (
        <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", py: 4 }}>
      <Container sx={{ color: "white" }}>
        {/* Trailer or Banner */}
        <Box sx={{ position: "relative", borderRadius: 2, overflow: "hidden", mb: 4 }}>
          {trailer ? (
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=0&controls=1&loop=1&playlist=${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                height: { xs: 200, sm: 300, md: 400 },
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </Box>

        {/* Movie Info */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
          {/* Poster */}
          <Box
            component="img"
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            sx={{ width: { xs: "100%", sm: "300px" }, borderRadius: 2 }}
          />

          {/* Details */}
          <Box>
            <Typography variant="h4" gutterBottom>{movie.title}</Typography>
            <Typography variant="body1" paragraph>{movie.overview}</Typography>
            <Typography><strong>Release:</strong> {movie.release_date}</Typography>
            <Typography><strong>Runtime:</strong> {movie.runtime} min</Typography>
            <Typography><strong>Rating:</strong> {movie.vote_average}/10</Typography>

            {/* Genres */}
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

        {/* Cast */}
        {cast.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>Top Cast</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {cast.map((actor) => (
                <Card
                  key={actor.id}
                  sx={{ width: 150, backgroundColor: "#1e1e1e", color: "white" }}
                >
                  <CardMedia
                    component="img"
                    height="225"
                    image={
                      actor.profile_path
                        ? `${PROFILE_BASE_URL}${actor.profile_path}`
                        : "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt={actor.name}
                  />
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {actor.name}
                    </Typography>
                    <Typography variant="caption" color="gray">
                      as {actor.character}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
        {/* Similar Movies */}
        {similar.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>Recommended</Typography>
            <Box sx={{ display: "flex", overflowX: "scroll", gap: 2, py: 2 }}>
              {similar.map((sim) => (
                <Link to={`/movie/${sim.id}`} key={sim.id} style={{ textDecoration: "none" }}>
                  <Card sx={{ width: 140, backgroundColor: "#1e1e1e", color: "white" }}>
                    <CardMedia
                      component="img"
                      height="210"
                      image={
                        sim.poster_path
                          ? `${IMAGE_BASE_URL}${sim.poster_path}`
                          : "https://via.placeholder.com/140x210?text=No+Image"
                      }
                      alt={sim.title}
                    />
                    <CardContent>
                      <Typography variant="body2" noWrap>
                        {sim.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
    )
}
export default MovieDetailPage;