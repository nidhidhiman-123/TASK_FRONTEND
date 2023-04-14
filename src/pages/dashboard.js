
import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [link, setLink] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let authTokens = localStorage.getItem("authToken");
    if (!authTokens) {
      navigate("/login"); 
    } else {
      setLink(true);
    }
  });
  const logout = () => {
    localStorage.removeItem("authToken");

    navigate("/login");
  };
  return (
    <>
      {link ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >

              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        ""
      )}
      <div>
        <h1>Welcome To Dashboard Page</h1>


      </div>
    </>

  );
}