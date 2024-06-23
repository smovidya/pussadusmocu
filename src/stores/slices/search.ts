import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type StateProp = {
  name: string;
};

type OptionPayload = {
  name: string;
};

const initialValue: StateProp = { name: "" };

const appSlice = createSlice({
  name: "parcel_name",
  initialState: initialValue,
  reducers: {
    selectedOption: (state, action: PayloadAction<OptionPayload>) => {
      state.name = action.payload.name;
    },
  },
});

export default appSlice.reducer;
export const parcelSelector = (state: RootState) => state.parcelReducer;
export const { selectedOption } = appSlice.actions;
