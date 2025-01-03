import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

const userAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
});

userAxios.interceptors.request.use(
  async (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
      const decodedToken = jwtDecode(token);
      const isExpired = dayjs.unix(decodedToken?.exp).diff(dayjs()) < 1;

      if (isExpired && request?.url !== `/api/auth/user/refresh-token`) {
        try {
          // Refresh the token
          const response = await userAxios.post(`/api/auth/user/refresh-token`);
          const newToken = response?.data?.data;

          // Store new token and retry the original request
          localStorage.setItem("token", newToken);
          request.headers.Authorization = `Bearer ${newToken}`;
          return request;
        } catch (error) {
          if (error?.response?.status === 422) {
            localStorage.removeItem("token");
            window.location.href = "/";
          }
          return Promise.reject(error);
        }
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

userAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 422) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default userAxios;
