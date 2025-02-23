import "../App.css";

// Footer Component
const Footer = () => {
  return (
    <footer sx={{ backgroundColor: "maroon" }}>
      <p>&copy; {new Date().getFullYear()} CodeCraft Labs. All rights reserved.</p>
    </footer>
  );
};

export default Footer;