import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createApp, getAllApps, getApp } from "../api/appApi";

export function useGetApp(appName: string) {
  const { isLoading, data } = useQuery(
    ["getApp", appName],
    () => getApp(appName),
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
  };
}

export function useGetAllApps() {
  const { isLoading, data } = useQuery(["getAlApps"], () => getAllApps(), {
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      toast.error(`${data?.explanation ?? data?.reason}`, {
        position: "top-right",
      });
    },
    staleTime: 10 * 60 * 1000, // 10 mins
  });
  return {
    isLoading,
    data,
  };
}

export function useCreateApp() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: createAppFn } = useMutation(
    (appName: string, description?: string) => createApp(appName, description),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAlApps"]);
        toast.success("App Created Successfully.");
      },
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
    createApp: createAppFn,
  };
}
