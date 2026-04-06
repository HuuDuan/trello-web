import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo giá trị của một slice trong redux
const initialState = {
  currentActiveCard: null,
};

// khởi tạo một silce trong kho lưu trữ - redux store
const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
    reducers: {
        clearCurrentActiveCard: (state) => {
            state.currentActiveCard = null;
        },
        updateCurrentActiveCard: (state, action) => {
            const fullCard = action.payload;
            state.currentActiveCard = fullCard;
        }
    },
    extraReducers: (builder) => {}
});

// Export các action để sử dụng trong component
export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions;

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard;

export const activeCardReducer = activeCardSlice.reducer;
