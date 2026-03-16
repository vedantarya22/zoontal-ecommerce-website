import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Navbar.css";

const links = [
  { label: "Home", path: "/" },
  { label: "Collection", path: "/collection" },
  
];

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { showToast } = useToast();   // ← inside the function

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  return (
    <nav className="site-nav">
      <div className="nav-inner">

        <Link to="/" className="nav-logo">
          <img src="/zoontal_image_b.png" alt="Zoontal" className="nav-logo-img" />
        </Link>

        <ul className="nav-links desktop-only">
          {links.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${pathname === path ? "active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        <button
          className="nav-hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          {links.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`nav-mobile-link ${pathname === path ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {isAdmin && (
            <button
              className="nav-mobile-link nav-mobile-logout"
              onClick={() => { handleLogout(); setMenuOpen(false); }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;