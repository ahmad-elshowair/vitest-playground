import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

import App from "../App";

describe("App", () => {
  it("renders the app", () => {
    render(<App />);
    expect(screen.getByText("Vitest Playground")).toBeInTheDocument();
  });

  it("Render h1 content", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Fruit Nutrition Explorer",
    );
  });
});
