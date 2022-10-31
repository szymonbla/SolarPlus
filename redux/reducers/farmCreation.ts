import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { FarmI } from "types";

export interface FarmCreationI extends FarmI {
  stepStatus?: number;
}

const initialState: FarmCreationI = {
  stepStatus: 0,
  farmName: "",
  location: {
    latitude: "",
    longitude: "",
  },
};

const farmCreationSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    configureNewFarm: (
      state,
      {
        payload: {
          farmName,
          location: { latitude, longitude },
        },
      }: PayloadAction<FarmCreationI>
    ) => {
      return (state = {
        farmName,
        location: {
          latitude,
          longitude,
        },
      });
    },
  },
});

const { actions, reducer } = farmCreationSlice;
export const selectStepStatus = (state: RootState) => state.farm.stepStatus;

export const { configureNewFarm } = actions;
export default reducer;
