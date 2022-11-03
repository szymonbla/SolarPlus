import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modal";
import farmReducer from "./reducers/farmCreation";
import progressBarStatus from "./reducers/progressBarStatus";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    farm: farmReducer,
    progressBarStatus: progressBarStatus,
  },
  devTools: process.env.NODE_ENV !== "production" && true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
