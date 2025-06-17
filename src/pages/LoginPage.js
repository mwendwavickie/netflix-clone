import React, {useState} from "react";
import { Container, Box, Button, TextField, Typography, Link, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
    console.log("Login:", { email, password });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9))`,
                backgroundColor: "#141414",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
            }}
        >
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ p: 4, backgroundColor: "#1c1c1c" }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "white", fontWeight: "bold" }}
            >
            Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="filled"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                    mb: 2,
                    input: { color: "white" },
                    label: { color: "#aaa" },
                    backgroundColor: "#333",
                    }} 
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                    mb: 3,
                    input: { color: "white" },
                    label: { color: "#aaa" },
                    backgroundColor: "#333",
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="error"
                    size="large"
                    sx={{ mb: 2 }}
                >
                    Login
                </Button>
            </form>
                    <Typography align="center" sx={{ color: "#aaa" }}>
                    Don't have an account?{" "}
                        <Link
                        underline="hover"
                        sx={{ color: "#f44336", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                        >
                            SignUp
                        </Link>
                    </Typography>

            </Paper>
        </Container>
    </Box>

    )
}
export default LoginPage;

