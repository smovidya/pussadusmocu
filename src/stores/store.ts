import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import typeReducer from "./slices/type";
import groupReducer from "./slices/group";
import departmentReducer from "./slices/department";
import datepickerReducer from "./slices/datepicker";

export const store = configureStore({
  reducer: { typeReducer, groupReducer, departmentReducer, datepickerReducer },
});

// create and export typed-hooks in file
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
