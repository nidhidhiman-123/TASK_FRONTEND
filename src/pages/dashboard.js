import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../baseUrl";

  
export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [link, setLink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let authTokens = localStorage.getItem("authToken");
    if (!authTokens) {
      navigate("/login");
    } else {
      setLink(true);
    }
  }, [navigate]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('video', selectedFile);

      const response = await axios.post(`${BASE_URL}/video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });

      console.log(response.data);

    } catch (error) {
      console.error('Error:', error);

    }
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
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Video</button>
        <div>{uploadProgress}% uploaded</div>
      </div>
    </>
  );
}
