import { configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from "./activeBoard/activeBoardSlice";
import { userReducer } from "./user/userSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { activeCardReducer } from "~/redux/activeCard/activeCardSlice";

// cấu hình persist 
const rootPersistConfig = {
  key: 'root', // key của cái persist do chúng ta chỉ định, cứ để mặc định là root
  storage: storage, // Biến storage ở trên -lưu vào localStorage
  whitelist: ['user'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt
  // blacklist: ['user'] // định nghĩa các slice dữ liệu không được phép duy trì qua mỗi lần f5 trình duyệt
}

// Combine các reducers trong dự án chúng ta ở đây
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})

// Thực hiện persist reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false, // tắt cảnh báo về non-serializable value trong redux-persist
  }),
});
