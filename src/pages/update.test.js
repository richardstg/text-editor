import React from "react";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render, cleanup, fireEvent, screen } from "@testing-library/react";

import Update from "./update";

afterEach(cleanup);

it("tests that the page to update a text is rendered", async () => {
  const history = createMemoryHistory({
    initialEntries: ["/613a616168333e3b2cc22478"],
  });
  // Test first render and componentDidMount
  render(
    <Router history={history}>
      <Route path={"/:id"} component={Update} />
    </Router>
  );
  expect(await screen.findByText(/First text/i)).toBeInTheDocument();
});

// it("tests that the user gets feedback when a text is updated", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/613a616168333e3b2cc22478"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <Router history={history}>
//       <Route path={"/:id"} component={Update} />
//     </Router>
//   );

//   const button = await screen.findByText(/Update Text/i);

//   fireEvent.click(button);

//   expect(await screen.findByTestId("feedback")).toBeInTheDocument();
// });

// it("tests that the user is redirected to home page", async () => {
//   const history = createMemoryHistory({
//     initialEntries: ["/613a616168333e3b2cc22478"],
//   });
//   // Test first render and componentDidMount
//   render(
//     <Router history={history}>
//       <Route path={"/:id"} component={Update} />
//     </Router>
//   );

//   const button = await screen.findByText(/Update Text/i);

//   fireEvent.click(button);

//   //   //   expect(await screen.findByTestId("back")).toBeInTheDocument();
//   //   const backLink = await screen.findByTestId("back");
//   //   fireEvent.click(backLink);
//   //   expect(await screen.findByTestId("add-text")).toBeInTheDocument();

//   const backLink = await screen.findByTestId("back");

//   const leftClick = { button: 0 };
//   userEvent.click(backLink, leftClick);

//   // check that the content changed to the new page
//   expect(screen.getByText(/Add Text/i)).toBeInTheDocument();
// });
