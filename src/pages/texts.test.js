import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Texts from "./texts";

afterEach(cleanup);

it("tests that the page shows the texts from the database", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/texts"],
  });
  // Test first render and componentDidMount
  render(
    <Router history={history}>
      {/* <Route path={"/texts"} component={Texts} /> */}
      <Route
        path="/texts"
        render={(props) => (
          <Texts
            texts={[
              { id: "12345", name: "First text", content: "Some content..." },
            ]}
          />
        )}
      />
    </Router>
  );

  expect(await screen.findByText(/First text/i)).toBeInTheDocument();
});
