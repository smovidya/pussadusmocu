import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import type { RootState } from "../store";
import type { DateRange } from "react-day-picker";

type StateProp = {
  date: DateRange | undefined;
};

type DatePayload = {
  date: DateRange;
};

const initialValue: StateProp = {
  date: {
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  },
};

const appSlice = createSlice({
  name: "datepicker",
  initialState: initialValue,
  reducers: {
    setDate: (state, action: PayloadAction<DatePayload>) => {
      state.date = action.payload.date;
    },
  },
});

export default appSlice.reducer;
export const datepickerSelector = (state: RootState) => state.datepickerReducer;
export const { setDate } = appSlice.actions;
