import { BodyLayout } from "../../components/BodyLayout";
import Navbar from "../../components/Navbar";
import { Page } from "../../components/Page";
import { PageTitle } from "../../components/PageTitle";

function Event() {
  return (
    <BodyLayout>
      <Navbar selectedTab="Events" />
      <Page>
        <PageTitle title="Events" subTitle="Management >" />
        <div className="flex items-center justify-center text-lg font-extrabold">
          Event page
        </div>
      </Page>
    </BodyLayout>
  );
}

export default Event;
