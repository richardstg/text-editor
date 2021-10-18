import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";

const Toolbar = (props) => {
  const context = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-4 text-decoration-none">
      {context.isLoggedIn && (
        <>
          <Link to="/" className="text-decoration-none">
            <span className="m-3 text-dark text-decoration-none">Home</span>
          </Link>
          <Link to="/texts" className="text-decoration-none">
            <span className="m-3 text-dark">Texts</span>
          </Link>
          {/* <Link to="/users" className="text-decoration-none">
              <span className="m-3">Users</span>
            </Link> */}
          <Link to="/about" className="text-decoration-none">
            <span className="m-3 text-dark">About</span>
          </Link>
          <button className="btn btn-secondary" onClick={context.logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Toolbar;
