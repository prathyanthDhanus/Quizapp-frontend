import { useMutation ,useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "../axios/userAxiosInstance";
import {
  showSuccessToast,
  showErrorToast,
} from "../utils/toastNotification/Toast";


//================== fetch all questions  ===============

export const useFetchAllQuestions = (quizId) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await Axios.get(`/api/question/${quizId}`);
      return response?.data?.data;
    },
    onSuccess: (data) => {
      showSuccessToast(data?.message);
    },
    onError: (error) => {
      showErrorToast(
        error?.response?.data?.message || "Failed to fetch qusetion. Try again."
      );
    },
  });
};
