import axios from 'axios'
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "~/utils/formatters";
import { refreshTokenAPI } from '~/apis'; 
import { logoutUserAPI } from '~/redux/user/userSlice';

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

let authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use( (config) => {
    // Do something before request is sent
    interceptorLoadingElements(true)
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Khởi tạo một cái promise cho việc gọi api refresh token
let refreshTokenPromise = null

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    interceptorLoadingElements(false)
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)

    // xử lý refresh token tự động
    // TH1: nếu như nhận mã 401 từ be, thì gọi api đăng xuất luôn
    if (error.response?.status === 401) {
        axiosReduxStore.dispatch(logoutUserAPI(false));
    }

    // TH2: nếu như nhận mã 410 từ be, thì sẽ gọi API refresh token để làm mới lại 
    const originalRequest = error.config;
    // console.log("originalRequest: ", originalRequest)
    if (error.response?.status === 410 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (!refreshTokenPromise) {
            refreshTokenPromise = refreshTokenAPI()
            .then(data => {
              return data?.accessToken
            })
            .catch((_error) => {
              axiosReduxStore.dispatch(logoutUserAPI(false));
              return Promise.reject(_error);
            })
            .finally(() => {
              refreshTokenPromise = null
            })
        }
        return refreshTokenPromise.then((accessToken) => {

          return authorizedAxiosInstance(originalRequest);
        })

    }

    // Xử lý tập trung phần hiên thị thông báo lỗi
    let errorMessage = error?.message
    if (error.response?.data?.message) {
        errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
        toast.error(errorMessage)
    }
    return Promise.reject(error);
  });

export default authorizedAxiosInstance
