import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type StateProp = {
  key: string;
  label: string;
};

type OptionPayload = {
  key: string;
  label: string;
};

const initialValue: StateProp = { key: "", label: "" };

const appSlice = createSlice({
  name: "project",
  initialState: initialValue,
  reducers: {
    selectedOption: (state, action: PayloadAction<OptionPayload>) => {
      state.key = action.payload.key;
      state.label = action.payload.label;
    },
  },
});

export default appSlice.reducer;
export const projectSelector = (state: RootState) => state.projectReducer;
export const { selectedOption } = appSlice.actions;
