import React, { useState } from "react";
import { BodyLayout } from "../../../../components/BodyLayout";
import {
  VerticalTabGroup,
  VerticalTabType,
} from "../../../../components/VerticalTabs";
import { InAppLiveIntegrations } from "./InApp";
import { OtherLiveIntegrations } from "./Others";
import { EmailLiveIntegrations } from "./Email";

function LiveIntegrations() {
  const [selectedChannel, setSelectedChannel] = useState<VerticalTabType>('EMAIL');

  return (
    <BodyLayout>
      <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)}/>
      {selectedChannel === "EMAIL" && <EmailLiveIntegrations />}
      {selectedChannel === "IN-APP" && <InAppLiveIntegrations />}
      {selectedChannel === "OTHERS" && <OtherLiveIntegrations />}
    </BodyLayout>
  );
}

export default LiveIntegrations;
