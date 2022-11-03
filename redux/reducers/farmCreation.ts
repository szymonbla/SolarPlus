import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { FarmModelI } from "types";

const initialState: Partial<FarmModelI> = {
  farmName: "",
  location: {
    latitude: "",
    longitude: "",
  },
  pvPanel: {
    loss: 0,
    peakPower: 0,
  },
};

const farmCreationSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    configureNewFarm: (
      state,
      {
        payload: { farmName, location, pvPanel },
      }: PayloadAction<Partial<FarmModelI>>
    ) => {
      return {
        ...state,
        farmName,
        location: {
          latitude: location?.latitude,
          longitude: location?.longitude,
        },
        pvPanel: {
          loss: pvPanel?.loss,
          peakPower: pvPanel?.peakPower,
        },
      };
    },
  },
});

const { actions, reducer } = farmCreationSlice;
export const selectFarmState = (state: RootState) => state.farm;

export const { configureNewFarm } = actions;
export default reducer;
