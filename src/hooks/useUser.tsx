import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getAllUsers } from "../api/userApi";

export function useGetAllUsers(appName: string) {
  const { isLoading, data, isFetching } = useQuery(
    ["getAllUsers", appName],
    () => getAllUsers(appName),
    {
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.explanation ?? data?.reason}`, {
          position: "top-right",
        });
      },
    }
  );
  return {
    isLoading,
    data,
    isFetching,
  };
}
