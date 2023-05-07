import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    modalMovie: {},
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.showModal = true;
            state.modalMovie = action.payload;
        },
        unSetModal: (state) => {
            state.showModal = false;
            state.modalMovie = {};
        },
    },
});

export const { setModal, unSetModal } = modalSlice.actions;

export const selectModalView = (state) => state.modal.showModal;
export const selectModalMovie = (state) => state.modal.modalMovie;

export default modalSlice.reducer;
