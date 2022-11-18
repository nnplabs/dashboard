import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  createEvent,
  getAllEvents,
  connectProvider,
  disconnectProvider,
  updateEvent,
  updateConnectedProvider,
} from "../api/eventApi";
import { ConnectProviderRequest, CreateEventRequest } from "../types/api/event";

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

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: createEventFn } = useMutation(
    (event: CreateEventRequest) => createEvent(event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllEvents"]);
      },
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.explanation}`, {
          position: "top-right",
        });
      },
    }
  );

  return {
    isLoading,
    createEvent: createEventFn,
  };
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: updateEventFn } = useMutation(
    (event: CreateEventRequest) => updateEvent(event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllEvents"]);
      },
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.explanation}`, {
          position: "top-right",
        });
      },
    }
  );

  return {
    isLoading,
    updateEvent: updateEventFn,
  };
}

export function useConnectProvider() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    mutateAsync: connectProviderFn,
  } = useMutation((event: ConnectProviderRequest) => connectProvider(event), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllEvents"]);
    },
    onError: (error: AxiosError) => {
      const data: any = error?.response?.data;
      toast.error(`${data?.reason}`, {
        position: "top-right",
      });
    },
  });

  return {
    isLoading,
    isError,
    connectProvider: connectProviderFn,
  };
}

export function useUpdateConnectedProvider() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    mutateAsync: connectProviderFn,
  } = useMutation(
    (event: ConnectProviderRequest) => updateConnectedProvider(event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllEvents"]);
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
    isError,
    updateConnectedProvider: connectProviderFn,
  };
}

export function useDisconnectProvider() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: disconnectProviderFn } = useMutation(
    (event: ConnectProviderRequest) => disconnectProvider(event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllEvents"]);
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
    disconnectProvider: disconnectProviderFn,
  };
}