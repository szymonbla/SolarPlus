import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

interface ProgressBarStatus {
  stepOrder: number;
}

const initialState: ProgressBarStatus = {
  stepOrder: 0,
};

const progressBarStatus = createSlice({
  name: "progressBarStatus",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.stepOrder += 1;
    },
    reset: (state) => {
      state.stepOrder = 0;
    },
  },
});

const { actions, reducer } = progressBarStatus;
export const selectProgressBarStepOrder = (state: RootState) =>
  state.progressBarStatus.stepOrder;

export const { nextStep, reset } = actions;
export default reducer;
