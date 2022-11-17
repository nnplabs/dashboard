import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllProviders,
  getProvider,
  createProvider,
  deleteProvider,
  getAllAvailableProviders,
} from "../api/providerApi";
import { SERVER_URL } from "../constants";
import { CreateProviderRequest } from "../types/api/provider";
import { ControlType, DynamicFieldData } from "../types/dynamic-control-types";
import { ProviderMetadata } from "../types/provider";

export function useGetProvider(appName: string, providerName: string) {
  const { isLoading, data, isFetching } = useQuery(
    ["getProvider", appName, providerName],
    () => getProvider(appName, providerName),
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

export function useGetAllProviders(appName: string) {
  const { isLoading, data, isFetching } = useQuery(
    ["getAllProviders", appName],
    () => getAllProviders(appName),
    {
      onError: (error: AxiosError) => {
        const data: any = error?.response?.data;
        toast.error(`${data?.explanation ?? data?.reason}`, {
          position: "top-right",
        });
      },
      staleTime: 10 * 60 * 1000, // 5 mins
    }
  );
  return {
    isLoading,
    data,
    isFetching,
  };
}

export function useCreateProvider() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: createProviderFn } = useMutation(
    (provider: CreateProviderRequest) => createProvider(provider),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllProviders"]);
        toast.success("Provider Created Successfully.");
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
    createProvider: createProviderFn,
  };
}

export function useDeleteProvider() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: deleteProviderFn } = useMutation(
    ({ appName, providerName }: { appName: string; providerName: string }) =>
      deleteProvider(appName, providerName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAlProviders"]);
        toast.success("Provider Deleted Successfully.");
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
    deleteProvider: deleteProviderFn,
  };
}

export function useAllAvailableProviders() {
  const [allProviders, setAllProviders] = useState<ProviderMetadata[]>([]);

  const { isLoading, data, isRefetching } = useQuery(
    ["allAvailableProviders"],
    () => getAllAvailableProviders(),
    {
      onError: (error) => {
        toast.error("Something went wrong.", {
          position: "top-right",
        });
      },
      staleTime: 10 * 60 * 1000, // 5 mins
    }
  );

  useEffect(() => {
    if (isRefetching || !data) return;

    const providers = data.providers.map((provider) => {
      let integrationKeys: DynamicFieldData[] = provider.config.map((field) => {
        return {
          displayName: field.display_name,
          fieldName: field.key,
          inputType: field.type as ControlType,
          defaultValue: "",
          config: {
            required: field.required
              ? `${field.display_name} is required.`
              : false,
          },
        };
      });

      const data: ProviderMetadata = {
        integrationsKeys: integrationKeys,
        name: provider.display_name,
        providerType: provider.provider_key,
        channel: provider.channel,
        logo: `${SERVER_URL}/images/${provider.provider_key.toLowerCase()}.png`,
      };

      return data;
    });
    setAllProviders(providers);
  }, [isRefetching, data]);

  return {
    isLoading,
    allProviders,
    isRefetching,
  };
}
