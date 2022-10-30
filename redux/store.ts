import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modal";
export const store = configureStore({
  reducer: { modal: modalReducer },
  devTools: process.env.NODE_ENV !== "production" && true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
