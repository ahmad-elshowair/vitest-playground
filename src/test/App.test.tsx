import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App, WrappedApp } from "../App";

describe("App", () => {
  it("renders the app", () => {
    render(<WrappedApp />);
    expect(screen.getByText("Vitest Playground")).toBeInTheDocument();
  });

  it("Render h1 content", () => {
    render(<WrappedApp />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Fruit Nutrition Explorer",
    );
  });

  it("renders 404 page on unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/some"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "404 - Page Not Found",
    );
  });
});
