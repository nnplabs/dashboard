import { BodyLayout } from "../../components/BodyLayout";
import Navbar from "../../components/Navbar";

function Log() {
  return (
    <BodyLayout>
      <Navbar selectedTab='Logs' />
      <div className="flex items-center justify-center text-lg font-extrabold">
        Log page
      </div>
    </BodyLayout>
  );
}

export default Log;
