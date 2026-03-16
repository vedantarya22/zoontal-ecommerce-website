import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Footer.css";

function Footer() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <Link to="/">
            <img
              src="/zoontal_image_b.png"
              alt="Zoontal"
              className="footer-logo-img"
            />
          </Link>
        </div>

        <ul className="footer-links">
          {[
            { label: "Home", path: "/" },
            { label: "Collection", path: "/collection" },
          ].map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className="footer-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="footer-right">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="footer-social"
            aria-label="Instagram"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="footer-social"
            aria-label="Facebook"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <span className="footer-copy">
            &#169; {new Date().getFullYear()} Zoontal
          </span>

          {isAdmin ? (
            <button className="footer-admin" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/admin" className="footer-admin">
              Admin
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
