import { useState } from "react";
import { BodyLayout } from "../../../components/BodyLayout";
import {
  HorizontalTabData,
  HorizontalTabGroup,
  HorizontalTabType,
} from "../../../components/HorizontalTabs";
import Navbar from "../../../components/Navbar";
import { Page } from "../../../components/Page";
import { PageTitle } from "../../../components/PageTitle";
import AllIntegrations from "./All/All";
import LiveIntegrations from "./Live/Live";

function Integration() {
  const [selectedTab, setSelectedTab] = useState<HorizontalTabType>('ALL');

  const allTabs: HorizontalTabData[] = [
    {
      tab: "ALL",
      onClick: () => {setSelectedTab('ALL')},
    },
    {
      tab: "LIVE",
      onClick: () => {setSelectedTab('LIVE')},
    },
  ];

  return (
    <BodyLayout>
      <Navbar selectedTab="Integrations" />
      <Page>
        <PageTitle title="Integrations" subTitle="Management >" />
        <HorizontalTabGroup allTabs={allTabs} selectedTab={selectedTab} className='m-10'/>
        {selectedTab === 'ALL' && <AllIntegrations />}
        {selectedTab === 'LIVE' && <LiveIntegrations />}
      </Page>
    </BodyLayout>
  );
}

export default Integration;
