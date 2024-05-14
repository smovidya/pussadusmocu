import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PARCEL_TYPE } from "@prisma/client";

type StateProp = {
  key: PARCEL_TYPE;
  label: string;
};

type OptionPayload = {
  key: PARCEL_TYPE;
  label: string;
};

const initialValue: StateProp = { key: "NORMAL", label: "ทั่วไป" };

const appSlice = createSlice({
  name: "type",
  initialState: initialValue,
  reducers: {
    selectedOption: (state, action: PayloadAction<OptionPayload>) => {
      state.key = action.payload.key;
      state.label = action.payload.label;
    },
  },
});

export default appSlice.reducer;
export const typeSelector = (state: RootState) => state.typeReducer;
export const { selectedOption } = appSlice.actions;
