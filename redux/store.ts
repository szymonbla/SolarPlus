import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modal";
import farmReducer from "./reducers/farm";
import progressBarStatus from "./reducers/progressBarStatus";
import { farmApi } from "./api/v1/farm";
import { energyApi } from "./api/v1/energy";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    farm: farmReducer,
    progressBarStatus: progressBarStatus,
    [farmApi.reducerPath]: farmApi.reducer,
    [energyApi.reducerPath]: energyApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production" && true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(farmApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
