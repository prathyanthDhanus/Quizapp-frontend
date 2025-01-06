import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/userAxiosInstance";
import {
  showSuccessToast,
  showErrorToast,
} from "../utils/toastNotification/Toast";

//================== Fetch all quiz (category) ===============

export const useFetchAllQuiz = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const response = await Axios.get(`/api/quiz`);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      showSuccessToast(data?.message);
    },
    onError: (error) => {
      showErrorToast(
        error?.response?.data?.message || "Failed to fetch quiz. Try again."
      );
    },
  });
};

//================== Save the result to the database =======================

export const useSaveResult = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values) => {
      const response = await Axios.post("/api/result/", values);
      return response.data;
    },
    onSuccess: (data) => {
      showSuccessToast(data?.message);
      navigate("/home");
    },
    onError: (error) => {
      showErrorToast(
        error?.response?.data?.message ||
          "Failed to save the result. Please try again."
      );
    },
  });
};
