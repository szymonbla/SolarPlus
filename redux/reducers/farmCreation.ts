import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";
import { FarmModelI } from "types";

const initialState: FarmModelI = {
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
      { payload: { farmName, location, pvPanel } }: PayloadAction<FarmModelI>
    ) => {
      return {
        ...state,
        farmName: farmName,
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
    resetConfigurationFarm: () => {
      return {
        farmName: initialState.farmName,
        location: {
          latitude: initialState.location?.latitude,
          longitude: initialState.location?.longitude,
        },
        pvPanel: {
          loss: initialState.pvPanel?.loss,
          peakPower: initialState.pvPanel?.peakPower,
        },
      };
    },
  },
});

const { actions, reducer } = farmCreationSlice;
export const selectFarmState = (state: RootState) => state.farm;

export const { configureNewFarm, resetConfigurationFarm } = actions;
export default reducer;
