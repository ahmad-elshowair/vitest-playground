import { describe, expect, it } from "vitest";

import { getFruit } from "../components/Fruits";

describe("Loading Fruit Data", () => {
  it("Should load fruit", async () => {
    // ARRANGE
    const fruit = await getFruit("Apple");

    // ASSERTION
    expect(fruit).toMatchInlineSnapshot(
      {
        name: "Apple",
        id: 1,
        family: "Rosaceae",
        genus: "Malus",
        order: "Rosales",
        nutritious: {
          fat: 0.2,
          protein: 0.3,
          calories: 52,
          carbohydrates: 13.8,
        },
      },
      `
      {
        "family": "Rosaceae",
        "genus": "Malus",
        "id": 1,
        "name": "Apple",
        "nutritious": {
          "calories": 52,
          "carbohydrates": 13.8,
          "fat": 0.2,
          "protein": 0.3,
        },
        "order": "Rosales",
      }
    `,
    );
  });

  it("Should create snapshots file", async () => {
    // ARRANGE
    const fruit = await getFruit("Apple");

    // ACT
    expect(fruit).toMatchSnapshot();
  });
});
