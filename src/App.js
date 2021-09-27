import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Update from "./pages/update";
import About from "./pages/about";
import Texts from "./pages/texts";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
const socket = socketIOClient(ENDPOINT);

const App = () => {
  const [texts, setTexts] = useState([]);
  console.log(texts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
        const data = await response.json();
        setTexts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App p-5 container">
      {/* <Router basename="/~rist19/editor"> */}
      <Router>
        <Toolbar />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home texts={texts} setTexts={setTexts} />}
          />
          <Route path="/about" exact component={About} />
          <Route
            exact
            path="/texts"
            render={(props) => <Texts texts={texts} />}
          />
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
                  socket={socket}
                />
              )}
            />
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
