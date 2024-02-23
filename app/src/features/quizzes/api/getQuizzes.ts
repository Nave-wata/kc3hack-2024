import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";

export function getQuizzes() {
  return axios.get("/quiz");
}

export function useQuizzes() {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: () => getQuizzes(),
  });
}
