import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const HeroBanner = ({movie}) => {
    const navigate = useNavigate();
    if (!movie) return null;
    

    return(
        <Box
        sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: 2,
        }}
        >
            <Typography variant="h2" component="h1" sx={{ marginBottom: 2 }}>
                {movie.title || movie.name}
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 3 }}>
                {movie.overview}
            </Typography>
            <Button 
                variant="contained" 
                color="error" 
                onClick={() => navigate(`/movie/${movie.id}`)}
            >
                Watch Now
            </Button>

        </Box>
    )


}
export default HeroBanner;