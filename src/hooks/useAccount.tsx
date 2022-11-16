import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getAccount } from "../api/accountApi";

export function useAccount() {
  const { isLoading, data } = useQuery(["getAccount"], () => getAccount(), {
    onError: (error: AxiosError) => {
      console.log("Account can't be fetched : ", error);
    },
    staleTime: 10 * 60 * 1000, // 10 mins
  });
  return {
    isLoading,
    data,
  };
}
