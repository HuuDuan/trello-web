import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { toast } from 'react-toastify';


// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentUser: null,
}

export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
        return response.data;
    }
)

export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSuccessMessage = true) => {
        const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
        if (showSuccessMessage) {
            toast.success("Logged out successfully!")
        }
        return response.data;
    }
)

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {},
    // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ (Async)
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            const user = action.payload
            state.currentUser = user
        });
        builder.addCase(logoutUserAPI.fulfilled, (state) => {
            state.currentUser = null
        });
    }
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
};

// export default userSlice.reducer
export const userReducer = userSlice.reducer
