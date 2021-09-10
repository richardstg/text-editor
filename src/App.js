import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Update from "./pages/update";

const App = () => {
  return (
    <div className="App p-5">
      <Router>
        <Toolbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:id" component={Update} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
