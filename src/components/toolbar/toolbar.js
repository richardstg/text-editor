import React from "react";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      <div className="nav-item">
        <Link to="/">
          <span className="m-3">Home</span>
        </Link>
        <Link to="/texts">
          <span className="m-3">Texts</span>
        </Link>
        <Link to="/about">
          <span className="m-3">About</span>
        </Link>
      </div>
    </nav>
  );
};

export default Toolbar;
