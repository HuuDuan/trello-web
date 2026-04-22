# 📋 Trello Web

Một ứng dụng Trello clone được xây dựng với **React 18**, **Vite**, và **Redux**. Hỗ trợ quản lý dự án, board, danh sách và thẻ công việc với giao diện hiện đại sử dụng Material-UI.

## 🌟 Tính năng chính

- ✅ **Authentication** - Đăng nhập/Đăng ký với xác thực email
- ✅ **Board Management** - Tạo, chỉnh sửa, xóa board
- ✅ **Column & Card** - Quản lý danh sách (column) và thẻ công việc (card)
- ✅ **Drag & Drop** - Kéo thả card giữa các column (@dnd-kit)
- ✅ **Real-time Updates** - Cập nhật real-time sử dụng WebSocket (socket.io)
- ✅ **Rich Text Editor** - Markdown editor cho mô tả card
- ✅ **User Collaboration** - Mời người dùng vào board, phân quyền
- ✅ **Persistent State** - Redux Persist lưu trữ dữ liệu người dùng
- ✅ **Settings** - Quản lý tài khoản, bảo mật

## 🚀 Công nghệ sử dụng

### Frontend

| Công nghệ        | Phiên bản | Mục đích                |
| ---------------- | --------- | ----------------------- |
| React            | 18.2.0    | UI Framework            |
| Vite             | 4.3.2     | Build tool & Dev server |
| Redux Toolkit    | 2.0.1     | State management        |
| Material-UI      | 5.13.0    | Component library       |
| React Router     | 6.21.3    | Routing                 |
| @dnd-kit         | 6.0.8+    | Drag & drop             |
| Socket.io Client | 4.8.3     | Real-time communication |
| React Hook Form  | 7.49.3    | Form management         |
| Axios            | 1.5.1     | HTTP client             |
| MD Editor        | 4.1.0     | Markdown editor         |

### Build & Development

- **Vite**: Fast build tool và dev server
- **SWC**: Faster transpiler thay cho Babel
- **ESLint**: Code linting

## 📋 Yêu cầu

- **Node.js** >= 16.x
- **npm** >= 8.x hoặc **yarn** >= 1.22.x

## 💻 Cài đặt & Chạy

### 1. Clone repository

```bash
git clone https://github.com/HuuDuan/trello-web.git
cd trello-web
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Tạo file .env (nếu cần)

```bash
# .env hoặc .env.local
VITE_API_ROOT=http://localhost:5000/api
```

### 4. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

## 📚 Project Structure Details

### Redux Store (`src/redux/`)

- **activeBoard**: Quản lý board hiện tại
- **activeCard**: Quản lý card đang mở (modal)
- **user**: Quản lý thông tin user
- **notifications**: Quản lý thông báo hệ thống

### Pages (`src/pages/`)

- **Auth**: Trang đăng nhập/đăng ký
- **Boards**: Danh sách board, chi tiết board
- **Settings**: Cài đặt tài khoản, bảo mật
- **Users**: Quản lý người dùng

### Components (`src/components/`)

- **AppBar**: Header chính với menu
- **Modal/ActiveCard**: Modal xem/chỉnh sửa card
- **Loading**: Spinner loading
- **Form**: Components form tùy chỉnh

## 🔧 Scripts

```bash
# Development
npm run dev          # Chạy dev server với host
npm run preview      # Preview production build

# Production
npm run build        # Build production
npm run lint         # Kiểm tra code quality
```

## 🌐 Environment Variables

Nếu cần, tạo file `.env.local`:

```env
VITE_API_ROOT=http://your-api-server.com/api
```

## 🚀 Deployment

### Deploy lên Vercel (khuyến cáo)

1. **Connect repository** - Đăng nhập Vercel, import GitHub repository
2. **Build Settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** - Vercel sẽ tự động deploy khi push lên `master`

**Lưu ý**: File `vercel.json` đã được cấu hình để xử lý SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/assets/:path*",
      "destination": "/assets/:path*"
    },
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy lên các nền tảng khác

**Netlify**:

```bash
npm run build
# Drag folder 'dist' vào Netlify
```

**Docker**:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

## 🔐 Authentication Flow

1. User đăng nhập → API xác thực
2. Backend trả về JWT token
3. Token được lưu trong Redux Store & localStorage (via redux-persist)
4. Mỗi request sẽ gửi token trong header (`Authorization: Bearer <token>`)
5. Nếu token hết hạn (410 error) → tự động refresh token

## 🎨 Customization

### Theme (Material-UI)

Chỉnh sửa `src/theme.js` để đổi màu, font, breakpoints:

```javascript
const theme = {
  palette: {
    primary: { main: "#your-color" },
    secondary: { main: "#your-color" },
  },
};
```

### API Endpoints

Chỉnh sửa URL trong `src/utils/constants.js`:

```javascript
export const API_ROOT = "http://your-backend-api.com/api";
```

## 📖 Documentation

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Material-UI Docs](https://mui.com)
- [React Router Docs](https://reactrouter.com)
- [dnd-kit Docs](https://docs.dnd-kit.com)

## 📄 License

MIT License - xem file [LICENSE](LICENSE)

## 👨‍💻 Author

[GitHub](https://github.com/HuuDuan)

## 📞 Support

Nếu có vấn đề, vui lòng tạo issue trên GitHub hoặc liên hệ trực tiếp.

---

**Last Updated**: April 2026
