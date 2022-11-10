import { useState } from "react";
import { BodyLayout } from "../../../../components/BodyLayout";
import {
  VerticalTabGroup,
  VerticalTabType,
} from "../../../../components/VerticalTabs";
import { EmailAllIntegrations } from "./Email";
import { InAppAllIntegrations } from "./InApp";
import { OtherAllIntegrations } from "./Others";


function AllIntegrations() {
  const [selectedChannel, setSelectedChannel] = useState<VerticalTabType>('EMAIL');

  return (
    <BodyLayout>
      <VerticalTabGroup selectedTab={(tab) => setSelectedChannel(tab)}/>
      {selectedChannel === "EMAIL" && <EmailAllIntegrations />}
      {selectedChannel === "IN-APP" && <InAppAllIntegrations />}
      {selectedChannel === "OTHERS" && <OtherAllIntegrations />}
    </BodyLayout>
  );
}

export default AllIntegrations;
