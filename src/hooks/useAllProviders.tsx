import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllAvailableProviders, getAllProviders } from "../api/providerApi";
import { SERVER_URL } from "../constants";
import { Images } from "../images";
import mockData from "../mock/providers.json";
import { ControlType, DynamicFieldData } from "../types/dynamic-control-types";
import { ProviderMetadata } from "../types/provider";
import { AllProvidersResponse } from "../types/response/allProviders";

export function useAllProviders(): ProviderMetadata[] {
  const [allProviders, setAllProviders] = useState<ProviderMetadata[]>([]);

  const { isLoading, data: allProvidersData } = useQuery(
    ["allAvailableProviders"],
    () => getAllAvailableProviders(),
    {
      onError: (error) => {
        toast.error("Something went wrong.", {
          position: "top-right",
        });
      },
    }
  );
  const appName = "asd";
  const { isLoading: m, data: dd } = useQuery(
    ["getAllProviders", appName],
    () => getAllProviders(appName),
    {
      onError: (error) => {
        toast.error("Something went wrong.", {
          position: "top-right",
        });
      },
    }
  );

  //   const { isLoading: m, mutate: createPost } = useMutation(
  //     (appName: string) => getAllProviders(appName),
  //     {
  //       onSuccess: () => {
  //         toast.success("Post created successfully");
  //       },
  //       onError: (error: any) => {
  //         if (Array.isArray(error.response.data.error)) {
  //           error.data.error.forEach((el: any) =>
  //             toast.error(el.message, {
  //               position: "top-right",
  //             })
  //           );
  //         } else {
  //           toast.error(error.response.data.message, {
  //             position: "top-right",
  //           });
  //         }
  //       },
  //     }
  //   );

  console.log(dd);

  useEffect(() => {
    if (!allProvidersData) return;

    const providers = allProvidersData.providers.map((provider) => {
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
        key: provider.provider_key,
        channel: provider.channel,
        logo: `${SERVER_URL}/images/${provider.provider_key.toLowerCase()}.png`,
      };

      return data;
    });
    setAllProviders(providers);
  }, [allProvidersData]);

  return allProviders;
}
