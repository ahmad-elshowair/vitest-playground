import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Fruit } from "../../types/fruit";

import { getFruit } from "../../components/Fruits";

interface FruitState {
  fruit: Fruit | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FruitState = {
  fruit: undefined,
  status: "idle",
  error: null,
};

export const fetchFruit = createAsyncThunk(
  "fruits/fetchFruit",
  async (name: string) => {
    const fruit = await getFruit(name);
    return fruit;
  },
);

const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {
    clearFruit: (state) => {
      state.fruit = undefined;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFruit.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchFruit.fulfilled,
        (state, action: PayloadAction<Fruit | undefined>) => {
          state.fruit = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(fetchFruit.rejected, (state, action) => {
        state.fruit = undefined;
        state.error = action.error.message || "Failed to fetch fruit";
        state.status = "failed";
      });
  },
});

export const { clearFruit } = fruitsSlice.actions;
export default fruitsSlice.reducer;

