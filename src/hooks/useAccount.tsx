import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAccount, setupAccount } from "../api/accountApi";

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

export type SetupAccountRequest = {
  accountName: string;
  contractAddress: string;
};

export function useSetupAccount() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: setupAccountFn } = useMutation(
    (data: SetupAccountRequest) => setupAccount(data.accountName, data.contractAddress),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllProviders"]);
        toast.success("Account Setup Success.");
      },
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.reason}`, {
          position: "top-right",
        });
      },
    }
  );

  return {
    isLoading,
    setupAccount: setupAccountFn,
  };
}
