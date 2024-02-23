import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";
import { BokeEvaluationRequest } from "../types";

export function getBokeEvaluation(bokes: BokeEvaluationRequest) {
  return axios.post("/boke_evaluation", bokes);
}

export function useBokeEvaluation(bokes: BokeEvaluationRequest) {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: () => getBokeEvaluation(bokes),
  });
}
