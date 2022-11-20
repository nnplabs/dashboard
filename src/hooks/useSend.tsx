import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { sendEvent, SendEventRequest } from "../api/sendApi";

export function useSendEvent() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: sendEventFn } = useMutation(
    (sendEventArgs: SendEventRequest) => sendEvent(sendEventArgs),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAlApps"]);
        toast.success("Notification Request Send");
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
    sendEvent: sendEventFn,
  };
}
