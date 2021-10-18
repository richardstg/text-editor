import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import socketIOClient from "socket.io-client";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Update from "./pages/update";
import About from "./pages/about";
import Texts from "./pages/texts";
import Auth from "./pages/auth";
import Invite from "./pages/invite";

import { AuthContext } from "./context/authcontext";
import { useAuth } from "./hooks/authhook";

/* Socket */
// const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
// const socket = socketIOClient(ENDPOINT);

const App = () => {
  const { token, login, logout, userId, userEmail } = useAuth();
  const [texts, setTexts] = useState([]);
  const [textsError, setTextsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setTexts(data);
      } catch (error) {
        setTextsError(error.message);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const authorizedRoutes = (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Home
            texts={texts}
            textsError={textsError}
            setTextsError={setTextsError}
            setTexts={setTexts}
          />
        )}
      />
      <Route path="/about" exact component={About} />
      <Route
        exact
        path="/texts"
        render={(props) => <Texts texts={texts} textsError={textsError} />}
      />
      {/* <Route exact path="/users" render={(props) => <Users />} /> */}
      {texts && texts.length > 0 && (
        <Route
          path="/:id"
          render={(props) => (
            <Update
              {...props}
              text={
                texts.filter((text) => text.id === props.match.params.id)[0]
              }
              texts={texts}
              setTexts={setTexts}
              // socket={socket}
            />
          )}
        />
      )}
      <Redirect to="/" />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route path="/" exact component={Auth} />
      <Route path="/invite" render={(props) => <Invite />} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App container pb-5">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          userEmail: userEmail,
          login: login,
          logout: logout,
        }}
      >
        <Router basename="/~rist19/editor">
          {/* <Router> */}
          <Toolbar />
          {token ? authorizedRoutes : unauthorizedRoutes}
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
