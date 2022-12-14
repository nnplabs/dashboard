import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../../../../components/Input";
import { useAppContext } from "../../../../context/AppContext";
import { useCreateProvider } from "../../../../hooks/useProvider";
import { Images } from "../../../../images";
import { ProviderMetadata } from "../../../../types/provider";
import { DynamicControl } from "../../../../utils/DynamicControl";

type IntegrationFormDialogProps = {
  provider: ProviderMetadata;
  onCloseHandler: () => void;
};

export default function IntegrationFormDialog({
  provider,
  onCloseHandler,
}: IntegrationFormDialogProps) {
  return (
    <div className={"w-[600px] flex flex-col overflow-y-scroll"}>
      <IntegrationFormHeader
        providerName={provider.name}
        onCloseHandler={onCloseHandler}
        providerLogo={provider.logo}
      />
      <IntegrationForm provider={provider} onCloseHandler={onCloseHandler} />
    </div>
  );
}

export type IntegrationFormHeaderProps = {
  providerName: string;
  providerLogo?: string;
  onCloseHandler: () => void;
};

export function IntegrationFormHeader({
  onCloseHandler,
  providerLogo,
  providerName,
}: IntegrationFormHeaderProps) {
  return (
    <div className="h-[76px] py-4 px-6 flex flex-row border-b-2 border-b-gray-200 items-center">
      {providerLogo && <img src={providerLogo} className="h-10 w-10 mr-3" />}
      <div className="text-black text-xl font-medium">{providerName}</div>
      <div className="flex flex-1" />
      <img
        src={Images.Other.CloseIcon}
        className="h-5 w-5 cursor-pointer"
        onClick={onCloseHandler}
      />
    </div>
  );
}

type IntegrationFormProps = IntegrationFormDialogProps;

function IntegrationForm({ provider, onCloseHandler }: IntegrationFormProps) {
  const formMethods = useForm();
  const app = useAppContext();

  const { createProvider, isLoading } = useCreateProvider();

  const onSubmit = async (data: any, error: any) => {
    const newProvider = await createProvider({
      appName: app?.selectedApp?.name ?? "",
      channel: provider.channel,
      providerName: data.integration_name,
      providerType: provider.providerType,
      config: data
    })
    onCloseHandler();
  };

  const {
    handleSubmit,
    register,
    formState: {isSubmitting, errors, isValid },
  } = formMethods;

  return (
    <form
      className="flex flex-col h-full w-full p-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isLoading ? (
        <div className="m-auto">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="mb-1 text-sm">Name</div>
          <Input
            placeholder="A unique name for this integration"
            type="text"
            {...register("integration_name", { required: "Required" })}
            defaultValue={""}
          />
          {provider.integrationsKeys.length > 0 && (
            <div className="mt-8 mb-5 font-medium">Integration Keys</div>
          )}
          <FormProvider {...formMethods}>
            {provider.integrationsKeys.map((d, i) => (
              <div key={d.fieldName} className="mb-3">
                <div className="mb-1 text-sm">{d.displayName}</div>
                <DynamicControl data={d} errors={errors} />
              </div>
            ))}
          </FormProvider>
          <button
            type="submit"
            disabled={!isValid}
            className={classNames(
              "font-medium rounded-lg text-sm px-5 py-2.5 mt-7 focus:outline-none w-fit",
              {
                "bg-gray-300 hover:bg-gray-300 text-gray-700": !isValid,
                "bg-blue-700 hover:bg-blue-800 text-white": isValid,
              }
            )}
          >
            ADD INTEGRATION
          </button>
        </>
      )}
    </form>
  );
}
