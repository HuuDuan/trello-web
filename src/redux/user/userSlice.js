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

export const updateUserAPI = createAsyncThunk(
    'user/updateUserAPI',
    async (data) => {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
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
        builder.addCase(updateUserAPI.fulfilled, (state, action) => {
            let updatedUser = action.payload
            if (!updatedUser || typeof updatedUser !== 'object' || Array.isArray(updatedUser) || Object.keys(updatedUser).length === 0) {
                // Nếu backend trả {} (hoặc payload không dùng được), dùng request arg làm fallback
                const fallback = action.meta?.arg || {}
                updatedUser = fallback
            }

            if (updatedUser && typeof updatedUser === 'object' && !Array.isArray(updatedUser)) {
                const userPayload = updatedUser.user || updatedUser
                state.currentUser = {
                    ...state.currentUser,
                    ...userPayload,
                }
            } else {
                console.warn('updateUserAPI.fulfilled: unexpected payload fallback', updatedUser)
            }
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
