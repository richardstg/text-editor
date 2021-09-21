import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Toolbar from "./components/toolbar/toolbar";
import Home from "./pages/home";
import Update from "./pages/update";
import About from "./pages/about";
import Texts from "./pages/texts";

const App = () => {
  return (
    <div className="App p-5">
      <Router basename="/~rist19/editor">
        <Toolbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" exact component={About} />
          <Route path="/texts" exact component={Texts} />
          <Route path="/:id" component={Update} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
