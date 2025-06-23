import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, Box, TextField,
  IconButton, Drawer, List, ListItem, ListItemText,
  useMediaQuery, Avatar, Menu, MenuItem, Tooltip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    ...(user ? [{ name: "Watchlist", path: "/watchlist" }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  const renderButtons = () => (
    <>
      {navItems.map(({ name, path }) => (
        <Button
          key={name}
          component={Link}
          to={path}
          sx={{
            color: isActive(path) ? "tomato" : "#ddd",
            fontWeight: isActive(path) ? "bold" : "normal",
            borderBottom: isActive(path) ? "2px solid tomato" : "2px solid transparent",
            borderRadius: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              color: "tomato",
              borderBottom: "2px solid tomato"
            },
          }}
        >
          {name}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#121212", px: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "tomato",
            fontWeight: "bold",
            fontSize: "1.8rem",
            letterSpacing: 1,
          }}
        >
          🎬 Streamify
        </Typography>

        {/* Desktop Nav */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {renderButtons()}
          </Box>
        )}

        {/* Search */}
        {!isMobile && (
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: 2,
              flexGrow: 1,
              maxWidth: 350
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                input: { color: "white" },
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#1e1e1e",
                  borderRadius: 4,
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "tomato" },
                  "&.Mui-focused fieldset": { borderColor: "tomato" }
                },
              }}
            />
            <IconButton type="submit" sx={{ color: "tomato" }}>
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {/* User Auth / Avatar */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <Tooltip title={user.email}>
                  <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                    <Avatar sx={{ bgcolor: "tomato", width: 32, height: 32, fontSize: 14 }}>
                      {user.email?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      bgcolor: "#1f1f1f",
                      color: "white",
                      minWidth: 150,
                      "& .MuiMenuItem-root": {
                        "&:hover": { bgcolor: "#333" },
                      },
                    },
                  }}
                >
                  <MenuItem component={Link} to="/watchlist">Watchlist</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    border: "1px solid tomato",
                    color: "white",
                    borderRadius: 3,
                    px: 2,
                    "&:hover": { backgroundColor: "tomato" },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    backgroundColor: "tomato",
                    color: "white",
                    borderRadius: 3,
                    px: 2,
                    "&:hover": { backgroundColor: "red" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: "none" } }}
      >
        <Box sx={{ width: 250, p: 2, backgroundColor: '#111', height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2, color: "tomato" }}>Menu</Typography>
          <List>
            {navItems.map(({ name, path }) => (
              <ListItem
                key={name}
                button
                component={Link}
                to={path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: isActive(path) ? "tomato" : "white",
                  fontWeight: isActive(path) ? "bold" : "normal",
                }}
              >
                <ListItemText primary={name} />
              </ListItem>
            ))}
            {/* Auth Options */}
            {user ? (
              <ListItem button onClick={() => { logout(); setDrawerOpen(false); }}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <>
                <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/signup" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
