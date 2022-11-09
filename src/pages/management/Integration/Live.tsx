import { BodyLayout } from "../../../components/BodyLayout";
import Navbar from "../../../components/Navbar";

function Integration() {
  return (
    <BodyLayout>
      <Navbar selectedTab='Integrations' />
      <div className="flex items-center justify-center text-lg font-extrabold">
        Integration page
      </div>
    </BodyLayout>
  );
}

export default Integration;
