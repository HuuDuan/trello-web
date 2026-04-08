import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// Khởi tạo giá trị của một slice trong redux
const initialState = {
    currentNotifications: null
}

// CÁc hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux
export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`);
        return response.data;
    }
)

export const updateBoardInvitationAPI = createAsyncThunk(
    'notifications/updateBoardInvitationAPI',
    async ({ status, invitationId }) => {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status });
        return response.data;
    }
)

// Khởi tạo một slice trong kho lưu trữ
export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearCurrentNotifications: (state) => {
            state.currentNotifications = null;
        },
        updateCurrentNotifications: (state, action) => {
            state.currentNotifications = action.payload;
        },
        addNotification: (state, action) => {
            const incomingInvitation = action.payload;
            state.currentNotifications.unshift(incomingInvitation);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload;
            // đảo ngược đưa invitation mới nhất lên đầu tiên
            state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        })
        builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
            const incomingInvitation = action.payload;
            // Cập nhật lại dữ liệu boardInvitation
            const getInvitation = state.currentNotifications.find(notification => notification._id === incomingInvitation._id);
            getInvitation.boardInvitation = incomingInvitation.boardInvitation;
        })
    }
})

export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSlice.actions;

export const selectCurrentNotifications = (state) => state.notifications.currentNotifications;

export const notificationsReducer = notificationsSlice.reducer;
