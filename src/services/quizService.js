import { useMutation ,useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/userAxiosInstance";
import {
  showSuccessToast,
  showErrorToast,
} from "../utils/toastNotification/Toast";



//================== fetch all quiz (category) ===============

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
