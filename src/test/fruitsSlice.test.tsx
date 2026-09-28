import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it } from "vitest";

import type { RootState } from "../app/store";
import type { Fruit } from "../types/fruit";

import fruitsReducer, {
  clearFruit,
  fetchFruit,
} from "../features/fruits/fruitsSlice";

const initialState: RootState["fruits"] = {
  fruit: undefined,
  status: "idle" as const,
  error: null,
};

describe("Fruits Slice Test", () => {
  let store = configureStore({ reducer: { fruits: fruitsReducer } });

  beforeEach(() => {
    store = configureStore({ reducer: { fruits: fruitsReducer } });
  });

  const getState = () => store.getState().fruits;

  it("Should handle initial state", () => {
    expect(getState()).toEqual(initialState);
  });

  it("Should handle loading state", () => {
    store.dispatch(fetchFruit.pending("test", "banana"));

    const state = getState();
    expect(state.status).toEqual("loading");
    expect(state.fruit).toBeUndefined();
    expect(state.error).toBeNull();
  });

  it("Should handle fulfilled state", () => {
    const mockFruit: Fruit = {
      id: 1,
      name: "apple",
      family: "rosaceae",
      order: "rosales",
      genus: "malus",
      nutritious: {
        calories: 52,
        protein: 0.3,
        carbohydrates: 13.8,
        fat: 0.2,
      },
    };

    store.dispatch(fetchFruit.fulfilled(mockFruit, "test", "banana"));

    const state = getState();
    expect(state.status).toEqual("succeeded");
    expect(state.fruit).toEqual(mockFruit);
    expect(state.error).toBeNull();
  });

  it("Should handle rejected state", () => {
    store.dispatch(
      fetchFruit.rejected(new Error("Failed to fetch"), "test", "banana"),
    );

    const state = getState();
    expect(state.status).toEqual("failed");
    expect(state.fruit).toBeUndefined();
    expect(state.error).toEqual("Failed to fetch");
  });

  it("Should handle clear fruit", () => {
    store.dispatch(clearFruit());

    const state = getState();
    expect(state.status).toEqual("idle");
    expect(state.fruit).toBeUndefined();
    expect(state.error).toBeNull();
  });
});

