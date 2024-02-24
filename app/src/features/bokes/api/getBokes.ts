import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../lib/axios";

export function getBokes() {
  return axios.get("/boke");
}

export function useBokes() {
  return useQuery({
    queryKey: ["boke"],
    queryFn: () => getBokes(),
  });
}
