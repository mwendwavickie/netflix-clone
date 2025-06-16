import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const MovieRow = ({title, movies}) => {
    return (
        <Box sx={{ marginBottom: 4 }}>

            <Typography variant="h5" component="h2" sx={{ color: '#fff', marginBottom: 2 }}>
                {title}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    paddingY: 1,
                    gap: 2,
                    '&::-webkit-scrollbar': { display: 'none' }, // hide scrollbar
                }} 
            >
                {movies?.map((movie)=> (
                    <Card
                    key={movie.id}
                    sx={{
                      minWidth: 180,
                      backgroundColor: '#222',
                      color: 'white',
                      flex: '0 0 auto',
                    }}
                    >
                    <CardMedia
                        component="img"
                        height="270"
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || movie.name}
                    />
                     <CardContent sx={{ padding: 1 }}>
                       <Typography variant="body2" noWrap>
                        {movie.title || movie.name}
                       </Typography>
                     </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    )

}
export default MovieRow;