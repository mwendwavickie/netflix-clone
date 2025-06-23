import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        color: "white",
        py: 3,
        mt: 4,
        textAlign: "center",
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          © {new Date().getFullYear()} Streamify — All rights reserved.
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Built with ❤️ using React & TMDB API |
          <Link
            href="https://github.com/your-username/streamify"
            target="_blank"
            rel="noopener"
            color="inherit"
            sx={{ ml: 0.5, textDecoration: "underline" }}
          >
            GitHub
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
