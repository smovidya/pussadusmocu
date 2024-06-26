import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import typeReducer from "./slices/type";
import groupReducer from "./slices/group";
import departmentReducer from "./slices/department";
import datepickerReducer from "./slices/datepicker";
import projectReducer from "./slices/project";
import parcelReducer from "./slices/search";

export const store = configureStore({
  reducer: {
    typeReducer,
    groupReducer,
    departmentReducer,
    datepickerReducer,
    projectReducer,
    parcelReducer,
  },
});

// create and export typed-hooks in file
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
