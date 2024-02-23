import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";

export function getPelmanism() {
  return axios.get("/pelmanism");
}

export function usePelmanism() {
  return useQuery({
    queryKey: ["pelmanism"],
    queryFn: () => getPelmanism(),
  });
}
