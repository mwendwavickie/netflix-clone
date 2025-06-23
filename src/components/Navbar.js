import React, {useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, TextField, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../context/AuthContext";



const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [query, setQuery] = useState("");
    
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery("");
        }
    };

    return(
        <AppBar 
        position="sticky" 
        sx={{
            backgroundColor:"#141414",
            paddingX:2,
            }}
        >
            <Toolbar disableGutters sx={{justifyContent:"space-between"}}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                    textDecoration: "none",
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    }}
                >
                    🎬 Streamify
                </Typography>

                <Box sx={{display:"flex", gap:2}}>
                    <Button component={Link} to='/' sx={{color:"white"}}> Home </Button>
                    <Button component={Link} to='/movies' sx={{color:"white"}}> Movies </Button>
                    {user && (
                        <Button component={Link} to='/watchlist' sx={{ color: 'white' }}>
                            Watchlist
                        </Button>
                        )}
                </Box>

                {/* Search Field */}
                <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search movies or genres"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{
                    input: { color: "white" },
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#222",
                        borderRadius: 7,
                    },
                    }}
                />
                <IconButton type="submit" sx={{ color: "white" }}>
                    <SearchIcon />
                </IconButton>
                </Box>

                {/*Auth buttons */}    
                {user ? (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                    ) : (
                    <>
                        <Button component={Link} to="/login">Login</Button>
                        <Button component={Link} to="/signup">Sign Up</Button>
                    </>
                    )}
            </Toolbar>
        </AppBar>
    )

}
export default Navbar;