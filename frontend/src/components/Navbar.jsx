import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import './navbar.css'; // ✅ Import the CSS below

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="logo-text">chatty</Link>
        </div>

        {/* Navigation */}
        <nav className="navbar-links">
          <Link to="/settings" className="nav-link">Settings</Link>

          {authUser && (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={logout} className="nav-button">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
