import React from "react";
import "../App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back one entry in the history stack
  };

  return (
    <div className="full-page">
      <div className="top-nav-bar">
        <h2 className="left-title">CreatorHub</h2>

        <div className="nav-links">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          
          <Link to="/create">
            <h2>Create Post</h2>
          </Link>
        </div>

        <button onClick={handleGoBack}>← Back</button>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
