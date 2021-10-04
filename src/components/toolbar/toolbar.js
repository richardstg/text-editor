import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";

const Toolbar = (props) => {
  const context = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
      {context.isLoggedIn && (
        <>
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
            <button className="btn btn-secondary" onClick={context.logout}>
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Toolbar;
