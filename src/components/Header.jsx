import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import "../App.css"; // Correct relative path
import React from 'react'

//context stuff
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// auth
import { useAuthContext } from "@asgardeo/auth-react";
import { Link, useNavigate } from "react-router-dom"; // will make sure that the page reloads

const Header = () => {

  // auth
  const { state, signOut } = useAuthContext();
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle logout with redirect
  const handleLogout = async () => {
    await signOut();
    navigate("/"); // Redirect to home after logout
    window.location.reload(); // Force refresh to re-evaluate auth state
  };

  // handle input from context
  const { inputValue } = useContext(AppContext);
  const titleName = inputValue || ""; // Default to empty if no input

  return (
    <AppBar position="static" sx={{ backgroundColor: "maroon" }}>
      <Toolbar>
        <img
          src="https://www.svgrepo.com/show/9074/clown-fish.svg"
          alt="Logo"
          style={{ height: "50px", marginRight: "20px" }} // adjust the size and spacing
        />
        
        
        {/* Title */}

        <Typography variant="h5"  sx={{ flexGrow: 1 }}>
          Welcome {titleName} to CodeCraft Intranet
        </Typography>

        {/* Navigation */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/employee-mgmt">
            Employee Management
          </Button>
        </Box>

        {/* Show "Log Out" button if user is logged in */}
        {state?.isAuthenticated && (
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: "auto" }}>
            Sign Out
          </Button>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Header
