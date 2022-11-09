import { BodyLayout } from "../../components/BodyLayout";
import Navbar from "../../components/Navbar";

function Metric() {
  return (
    <BodyLayout>
      <Navbar selectedTab='Metrics' />
      <div className="flex items-center justify-center text-lg font-extrabold">
        Metric page
      </div>
    </BodyLayout>
  );
}

export default Metric;
