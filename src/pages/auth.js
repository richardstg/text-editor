import React, { useState } from "react";

import Login from "../components/auth/login";
import SignUp from "../components/auth/signup";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleModeHandler = () => {
    setIsLoginMode((prevState) => !prevState);
  };

  return (
    <div className="row">
      <div className="col-lg-4 offset-lg-4">
        {isLoginMode ? <Login /> : <SignUp />}
        <hr className="mt-3 mb-3" />
        <button onClick={toggleModeHandler} className="btn btn-success mt-1">
          {isLoginMode ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
