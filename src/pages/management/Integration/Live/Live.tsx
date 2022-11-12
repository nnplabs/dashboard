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
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('EMAIL');

  return (
    <BodyLayout>
      <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)}/>
      {selectedChannel === "EMAIL" && <EmailLiveIntegrations />}
      {selectedChannel === "IN-APP" && <InAppLiveIntegrations />}
      {selectedChannel === "OTHER" && <OtherLiveIntegrations />}
    </BodyLayout>
  );
}

export default LiveIntegrations;
