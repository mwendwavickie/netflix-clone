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
            color: isActive(path) ? "red" : "white",
            fontWeight: isActive(path) ? "bold" : "normal",
            "&:hover": { color: "tomato" },
          }}
        >
          {name}
        </Button>
      ))}
    </>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#141414", px: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "red",
            fontWeight: "bold",
            fontSize: "1.6rem",
          }}
        >
          🎬 Streamify
        </Typography>

        {/* Desktop Nav Links */}
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
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#222",
                  borderRadius: 5,
                },
              }}
            />
            <IconButton type="submit" sx={{ color: "white" }}>
              <SearchIcon />
            </IconButton>
          </Box>
        )}

        {/* Desktop Auth / Avatar */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {user ? (
              <>
                <Tooltip title={user.email || "User"}>
                  <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
                    <Avatar sx={{ bgcolor: "tomato" }}>
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  PaperProps={{
                    elevation: 2,
                    sx: {
                      mt: 1.5,
                      bgcolor: "#1f1f1f",
                      color: "white",
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
                    backgroundColor: "transparent",
                    border: "1px solid tomato",
                    color: "white",
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
                    "&:hover": { backgroundColor: "red" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Hamburger for Mobile */}
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
          <Typography variant="h6" sx={{ mb: 2, color: "red" }}>Menu</Typography>
          <List>
            {navItems.map(({ name, path }) => (
              <ListItem
                key={name}
                button
                component={Link}
                to={path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color: isActive(path) ? "red" : "white",
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
