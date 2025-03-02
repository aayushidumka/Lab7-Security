import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css"; // Correct relative path
import React from 'react'

//context stuff
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {

  // handle input from context
  const { inputValue } = useContext(AppContext);
  const titleName = inputValue || ""; // Default to empty if no input

  return (
    <AppBar position="static" sx={{ backgroundColor: "maroon" }}>
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  )
}

export default Header

// function Header() {
//   const titleName = "Aayushi";

//   return (
//     <header>
//       <h1 id="header-cust">Welcome {titleName} to CodeCraft Intranet</h1>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/employee-mgmt">Employee Management</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
