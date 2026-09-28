import { describe, expect, it } from "vitest";

import { divide, multiply, subtract, sum } from "../math";

describe("Should perform basic math operations", () => {
  it("Should add two number", () => {
    expect(sum(12, 2)).toBe(14);
  });
  it("Should subtract two number", () => {
    expect(subtract(1, 2)).toBe(-1);
  });
  it("Should multiply two number", () => {
    expect(multiply(1, 2)).toBe(2);
  });
  it("Should divide two number", () => {
    expect(divide(1, 2)).toBe(0.5);
  });
});
