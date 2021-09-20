import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "./home";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Add text/i);
  expect(linkElement).toBeInTheDocument();
});

// it("renders texts from the database", () => {
//   act(() => {
//     render(<Home />, container);
//   });
//   expect(container.textContent).toBe("First text");
//   expect(container.textContent).toBe("Second text");
//   expect(container.textContent).toBe("Newest text");
//   expect(container.textContent).toBe("...");

//   // act(() => {
//   //   render(<Hello name="Jenny" />, container);
//   // });
//   // expect(container.textContent).toBe("Hello, Jenny!");

//   // act(() => {
//   //   render(<Hello name="Margaret" />, container);
//   // });
//   // expect(container.textContent).toBe("Hello, Margaret!");
// });
