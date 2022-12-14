import { CircularProgress, Switch } from "@mui/material";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BodyLayout } from "../../../components/BodyLayout";
import { VerticalTabGroup } from "../../../components/VerticalTabs";
import { SERVER_URL } from "../../../constants";
import { useAppContext } from "../../../context/AppContext";
import { useEventContext } from "../../../context/EventContext";
import { useGetAllProviders } from "../../../hooks/useProvider";
import { ProviderData } from "../../../types/api/provider";
import { ChannelType, ChannelName, ChannelImg } from "../../../types/provider";
import { EventStepProps } from "./CreateEventSteps";
import { EventStepButton } from "./EventStepButton";

function ConnectProviderStep({
  handleNext,
  activeStep,
  handleBack,
}: EventStepProps) {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>("MAIL");
  const [filteredProviders, setFilteredProviders] = useState<ProviderData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const app = useAppContext();
  const { data: allProviders, isFetching } = useGetAllProviders(
    app?.selectedApp?.name ?? ""
  );

  const { data, setData } = useEventContext()!;

  const goToNext = () => {
    if (data.connectedProviders && data.connectedProviders.length === 0) {
      toast.error("Please select atleast one integration");
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    console.log("DATA : ", data);
  }, [data]);

  useEffect(() => {
    if (!allProviders) return;
    setFilteredProviders(
      allProviders.filter((p) => p.channel === selectedChannel)
    );
  }, [selectedChannel, allProviders]);

  useEffect(() => {
    if (!allProviders) return;
    if (!data.connectedProviders) {
      const connectedProviders: ProviderData[] = [];

      if (data.currentEvent) {
        data.currentEvent.connectedProviders.map((provider) => {
          const pData = allProviders.filter(
            (p) => p.name === provider.providerName
          );
          if (pData.length > 0) connectedProviders.push(pData[0]);
        });
      }

      const updatedData = { ...data, connectedProviders: connectedProviders };
      setData(updatedData);
    }
    setLoading(false);
  }, [allProviders]);

  const heading = `Add ${ChannelName[selectedChannel]} Integrations`;
  const subHeading = `You can use these live integrations to send an  ${ChannelName[selectedChannel]} notification. Select an integration to add it to your event`;

  return (
    <>
      <BodyLayout className="bg-white">
        <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)} />
        <div className="h-full w-full bg-white flex flex-col p-7">
          <div className="text-2xl">{heading}</div>
          <div className="text-sm font-normal text-gray-500">{subHeading}</div>
          {loading ? (
            <div className="m-auto">
              <CircularProgress />
            </div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 mt-7">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((p) => (
                  <ProviderRow provider={p} key={p.name} />
                ))
              ) : (
                <EmptyRow />
              )}
            </table>
          )}
        </div>
      </BodyLayout>
      <EventStepButton
        handleNext={goToNext}
        handleBack={handleBack}
        activeStep={activeStep}
      />
    </>
  );
}

function ProviderRow({ provider }: { provider: ProviderData }) {
  const { data, setData } = useEventContext()!;
  let connectedProviders = data.connectedProviders ?? [];

  const connected =
    connectedProviders.filter((p) => p.id === provider.id).length > 0;

  const handleChange = (_: any, checked: boolean) => {
    if (checked) connectedProviders.push(provider);
    else {
      connectedProviders = connectedProviders.filter(
        (p) => p.id !== provider.id
      );
    }
    const updatedData = { ...data, connectedProviders: connectedProviders };
    setData(updatedData);
  };

  return (
    <tbody className="text-sm text-gray-700 font-medium">
      <tr className="bg-white border-b-[1px]">
        <th className="py-4 w-1/5">
          <ProviderName provider={provider} />
        </th>
        <td className="py-4 w-1/5">
          <img src={ChannelImg[provider.channel]} />
        </td>
        <td className="py-4 w-1/5">
          {dateFormat(provider.updatedAt, "dd-mm-yyyy, h:MM TT")}
        </td>
        <td className="py-4 w-1/5 text-center">
          <LiveBadge connected={connected} />
        </td>
        <td className="py-4 w-1/5 text-right pr-4">
          <Switch checked={connected} onChange={handleChange} />
        </td>
      </tr>
    </tbody>
  );
}

function ProviderName({ provider }: { provider: ProviderData }) {
  return (
    <div className="flex flex-row h-full w-max">
      <img
        className="h-10 w-10 rounded-full mr-4"
        src={`${SERVER_URL}/images/${provider.providerKey.toLowerCase()}.png`}
      />
      <div className="flex flex-col font-normal">
        <div className="text-base">{provider.name}</div>
        <div className="text-xs text-gray-500">{provider.providerKey}</div>
      </div>
    </div>
  );
}

function EmptyRow() {
  return (
    <tr className="bg-white border-y-[1px] text-sm">
      <td className="py-4 flex text-center w-full">
        <div className="inline-block w-full">
          No live integrations added for this channel.
        </div>
      </td>
    </tr>
  );
}

function LiveBadge({ connected }: { connected: boolean }) {
  return connected ? (
    <div className="inline-block text-xs font-semibold text-green-700 p-1 bg-green-100 w-max">
      {"Connected"}
    </div>
  ) : (
    <></>
  );
}
export default ConnectProviderStep;
