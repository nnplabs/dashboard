import { BodyLayout } from "../../components/BodyLayout";
import Navbar from "../../components/Navbar";

function Setting() {
  return (
    <BodyLayout>
      <Navbar selectedTab="Settings" />
      <div className="flex items-center justify-center text-lg font-extrabold">
        Setting page
      </div>
    </BodyLayout>
  );
}

export default Setting;
