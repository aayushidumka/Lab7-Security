import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

// React Router imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import EmployeeMgmt from "./pages/EmployeeMgmt";

function App() {
  return (
    <Router>
      <Header /> {/* Keep Header outside so it's always visible */}

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-mgmt" element={<EmployeeMgmt />} />
      </Routes>

      <hr />

      <Footer /> {/* Keep Footer outside so it's always visible */}
    </Router>
  );
}

export default App;
