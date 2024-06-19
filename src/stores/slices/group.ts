import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PARCEL_GROUP } from "@prisma/client";

type StateProp = {
  key: PARCEL_GROUP;
  label: string;
};

type OptionPayload = {
  key: PARCEL_GROUP;
  label: string;
};

const initialValue: StateProp = { key: "OFFICE", label: "สำนักงาน" };

const appSlice = createSlice({
  name: "group",
  initialState: initialValue,
  reducers: {
    selectedOption: (state, action: PayloadAction<OptionPayload>) => {
      state.key = action.payload.key;
      state.label = action.payload.label;
    },
  },
});

export default appSlice.reducer;
export const groupSelector = (state: RootState) => state.groupReducer;
export const { selectedOption } = appSlice.actions;
