import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Toolbar from "./toolbar";

afterEach(cleanup);

it("tests that the about page is rendered when clicked on navlink", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/"],
  });

  render(
    <Router history={history}>
      <Toolbar />
    </Router>
  );

  const link = await screen.findByText(/About/i);

  fireEvent.click(link);

  expect(screen.getByText(/About/i)).toBeInTheDocument();
});

it("tests that the home page is rendered when clicked on navlink", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/about"],
  });

  render(
    <Router history={history}>
      <Toolbar />
    </Router>
  );

  const link = await screen.findByText(/Home/i);

  fireEvent.click(link);

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});
