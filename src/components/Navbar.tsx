import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        Til'lie
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end>
          Today I Learned
        </NavLink>

        <NavLink to="/lessons">Lessons</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
