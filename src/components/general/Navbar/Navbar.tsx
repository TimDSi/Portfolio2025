// src/components/Navbar.jsx
import Settings from '../Settings/Settings';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyPortfolio</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#projects">Projets</a></li>
        <li><a href="#carreer">Career path</a></li>
        <li><a href="#contact">Qualification</a></li>
        <li><Settings /></li>
      </ul>
    </nav>
  );
};

export default Navbar;
