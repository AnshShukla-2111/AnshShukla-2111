// import axios from "axios";
// import { updateLoading } from "../redux/userSlice";

// const AxiosInstance = axios.create({
//   baseURL: "http://localhost:9000",
//   headers: { "Content-Type": "application/json" },
// });

// // let dispatch = useDispatch()
// export const setUpInterceptors = (dispatch) => {
//   AxiosInstance.interceptors.request.use(
//     function (config) {
//       let token = JSON.parse(localStorage.getItem("MyMedia")).token;
//       console.log("token = ", token);
//       if (token) {
//         config.headers.Authorization = token;
//       }
//       // Do something before request is sent
//       dispatch(updateLoading(true));
//       return config;
//     },
//     function (error) {
//       // Do something with request error
//       return Promise.reject(error);
//     }
//   );

//   // Add a response interceptor
//   AxiosInstance.interceptors.response.use(
//     function (response) {
//       dispatch(updateLoading(false));
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       return response;
//     },
//     function (error) {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       return Promise.reject(error);
//     }
//   );
// };

// export default AxiosInstance;
