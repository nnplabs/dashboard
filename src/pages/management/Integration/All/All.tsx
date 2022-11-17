import { useEffect, useState } from "react";
import { BodyLayout } from "../../../../components/BodyLayout";
import { VerticalTabGroup } from "../../../../components/VerticalTabs";

import { ChannelType, ProviderMetadata } from "../../../../types/provider";

import { IntegrationCard } from "../../../../components/IntegrationCard";
import { Modal } from "../../../../components/Modal";
import IntegrationFormDialog from "./ProviderForm";
import { useAllAvailableProviders } from "../../../../hooks/useProvider";
import { CircularProgress } from "@mui/material";

function AllIntegrations() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>("MAIL");
  const [filteredProviders, setFilteredProviders] = useState<
    ProviderMetadata[]
  >([]);
  const [selectedProvider, setSelectedProvider] = useState<ProviderMetadata>();

  const { allProviders, isLoading } = useAllAvailableProviders();
  
  useEffect(() => {
    setFilteredProviders(
      allProviders.filter((p) => p.channel === selectedChannel)
    );
  }, [selectedChannel, allProviders]);

  return (
    <>
      <BodyLayout className="px-10 pb-10">
        <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)} />
        <div className="h-full w-full bg-white flex flex-col p-7">
          {isLoading && <div className="m-auto"><CircularProgress /></div>}
          {filteredProviders.map((p) => {
            return (
              <IntegrationCard
                key={p.providerType}
                title={p.name}
                imageSrc={p.logo}
                channel={p.channel}
                onClick={() => setSelectedProvider(p)}
              />
            );
          })}
        </div>
      </BodyLayout>
      {selectedProvider && (
        <Modal onClose={() => setSelectedProvider(undefined)}>
          {(toggle) => (
            <IntegrationFormDialog
              onCloseHandler={toggle}
              provider={selectedProvider}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default AllIntegrations;
