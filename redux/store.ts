import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modal";
import farmReducer from "./reducers/farmCreation";
import progressBarStatus from "./reducers/progressBarStatus";
import { farmApi } from "./api/v1/farm";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    farm: farmReducer,
    progressBarStatus: progressBarStatus,
    [farmApi.reducerPath]: farmApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production" && true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(farmApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
