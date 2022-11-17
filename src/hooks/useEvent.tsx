import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getAllEvents } from "../api/eventApi";

export function useGetAllEvents(appName: string) {
  const { isLoading, data, isFetching } = useQuery(
    ["getAllEvents", appName],
    () => getAllEvents(appName),
    {
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.explanation ?? data?.reason}`, {
          position: "top-right",
        });
      },
      staleTime: 10 * 60 * 1000, // 10 mins
    }
  );
  return {
    isLoading,
    data,
    isFetching,
  };
}
