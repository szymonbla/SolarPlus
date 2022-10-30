import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

export interface ModalStateI {
  isOpen: boolean;
}

const initialState: ModalStateI = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

const { actions, reducer } = modalSlice;
export const selectModalState = (state: RootState) => state.modal.isOpen;

export const { openModal, closeModal } = actions;
export default reducer;
