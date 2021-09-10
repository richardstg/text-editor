import React from "react";
import { Link } from "react-router-dom";

const Toolbar = (props) => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-4">
      <div class="nav-item">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Toolbar;
