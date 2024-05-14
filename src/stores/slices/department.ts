import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Department } from "@prisma/client";

type StateProp = {
    key: Department,
    label: string
};

type OptionPayload = {
    key: Department,
    label: string
};

const initialValue: StateProp = { key: "SMO", label: "สโม" };

const appSlice = createSlice({
    name: "department",
    initialState: initialValue,
    reducers: {
        selectedOption: (state, action: PayloadAction<OptionPayload>) => {
            state.key = action.payload.key;
            state.label = action.payload.label;
        }
    },
});

export default appSlice.reducer;
export const departmentSelector = (state: RootState) => state.departmentReducer;
export const { selectedOption } = appSlice.actions;
