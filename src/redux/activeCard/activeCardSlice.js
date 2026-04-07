import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo giá trị của một slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
};

// khởi tạo một silce trong kho lưu trữ - redux store
const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
    reducers: {
        showModalActiveCard: (state) => {
            state.isShowModalActiveCard = true;
        },
        clearAndHideCurrentActiveCard: (state) => {
            state.currentActiveCard = null;
            state.isShowModalActiveCard = false;
        },
        updateCurrentActiveCard: (state, action) => {
            const fullCard = action.payload;
            state.currentActiveCard = fullCard;
        }
    },
    extraReducers: (builder) => {}
});

// Export các action để sử dụng trong component
export const { clearAndHideCurrentActiveCard, updateCurrentActiveCard, showModalActiveCard } = activeCardSlice.actions;

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard;

export const selectIsShowModalActiveCard = (state) => state.activeCard.isShowModalActiveCard;

export const activeCardReducer = activeCardSlice.reducer;
