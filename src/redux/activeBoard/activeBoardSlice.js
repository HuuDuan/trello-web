import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from "~/utils/sorts";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import authorizedAxiosInstance from "~/utils/authorizeAxios";


// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentActiveBoard: null,
}

export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data;
    }
)

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
        const board = action.payload

        state.currentActiveBoard = board
    },
  },
    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ (Async)
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            let board = action.payload
            board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");
            
            board.columns.forEach((column) => {
                if (isEmpty(column.cards)) {
                    const placeholder = generatePlaceholderCard(column);
                      column.cards = [placeholder];
                      column.cardOrderIds = [placeholder._id];
                } else {
                    column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
                }
            });

            state.currentActiveBoard = board
        });
    }
})

// Action creators are generated for each case reducer function
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

export const selectCurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard;

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer;
