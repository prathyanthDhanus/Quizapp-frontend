import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../../axios/userAxiosInstance";
import {
  showSuccessToast,
  showErrorToast,
} from "../../utils/toastNotification/Toast";

//============= user login service ================

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values) => {
      const response = await Axios.post("/api/user/login", values);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data?.token);
      showSuccessToast(data?.message);
      navigate("/home");
    },
    onError: (error) => {
      showErrorToast(
        error?.response?.data?.message || "Login failed. Try again."
      );
    },
  });
};

//============= user register service ================

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values) => {
      const response = await Axios.post("/api/user/register", values);
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessToast(data?.message);
      navigate("/login");
    },
    onError: (error) => {
      showErrorToast(
        error?.response?.data?.message || "Registration failed. Try again."
      );
    },
  });
};
