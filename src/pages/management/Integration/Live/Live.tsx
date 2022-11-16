import React, { useState } from "react";
import { BodyLayout } from "../../../../components/BodyLayout";
import {
  VerticalTabGroup,
} from "../../../../components/VerticalTabs";
import { InAppLiveIntegrations } from "./InApp";
import { OtherLiveIntegrations } from "./Others";
import { EmailLiveIntegrations } from "./Email";
import { ChannelType } from "../../../../types/provider";

function LiveIntegrations() {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('MAIL');

  return (
    <BodyLayout>
      <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)}/>
      {selectedChannel === "MAIL" && <EmailLiveIntegrations />}
      {selectedChannel === "IN_APP" && <InAppLiveIntegrations />}
      {selectedChannel === "OTHER" && <OtherLiveIntegrations />}
    </BodyLayout>
  );
}

export default LiveIntegrations;
