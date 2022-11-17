import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { BodyLayout } from "../../../../components/BodyLayout";
import { VerticalTabGroup } from "../../../../components/VerticalTabs";
import { SERVER_URL } from "../../../../constants";
import { useAppContext } from "../../../../context/AppContext";
import { useGetAllProviders } from "../../../../hooks/useProvider";
import { ProviderData } from "../../../../types/api/provider";
import {
  ChannelType,
  ChannelName,
  ChannelImg,
} from "../../../../types/provider";

function LiveIntegrations() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>("MAIL");
  const [filteredProviders, setFilteredProviders] = useState<ProviderData[]>(
    []
  );
  const [selectedProvider, setSelectedProvider] = useState<ProviderData>();

  const app = useAppContext();
  const { data: allProviders, isFetching } = useGetAllProviders(
    app?.selectedApp?.name ?? ""
  );

  useEffect(() => {
    if (!allProviders) return;
    setFilteredProviders(
      allProviders.filter((p) => p.channel === selectedChannel)
    );
  }, [selectedChannel, allProviders]);

  const heading = `Live ${ChannelName[selectedChannel]} Integrations`;
  const subHeading = `You can use these live integrations to send an  ${ChannelName[selectedChannel]} notification. Select an integration while creating your event`;

  return (
    <BodyLayout className="px-10 pb-10">
      <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)} />
      <div className="h-full w-full bg-white flex flex-col p-7">
        <div className="text-2xl">{heading}</div>
        <div className="text-sm font-normal text-gray-500">{subHeading}</div>
        {isFetching ? (
          <div className="m-auto">
            <CircularProgress />
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 mt-7">
            {filteredProviders.map((p) => (
              <ProviderRow provider={p} key={p.name} />
            ))}
          </table>
        )}
      </div>
    </BodyLayout>
  );
}

function ProviderRow({ provider }: { provider: ProviderData }) {
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
          <LiveBadge count={provider.EventProviders.length} />
        </td>
        <td className="py-4 w-1/5 text-right pr-4">
          <EditOutlined className="cursor-pointer mr-4" />
          <DeleteOutlined className="cursor-pointer" />
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

function LiveBadge({ count }: { count: number }) {
  return (
    <div className="inline-block text-xs font-semibold text-green-700 p-1 bg-green-100 w-max">
      {`${count} LIVE`}
    </div>
  );
}
export default LiveIntegrations;

export function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}