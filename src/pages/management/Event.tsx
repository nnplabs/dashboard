import { BodyLayout } from "../../components/BodyLayout";
import Navbar from "../../components/Navbar";

function Event() {
  return (
    <BodyLayout>
      <Navbar selectedTab='Events' />
      <div className="flex items-center justify-center text-lg font-extrabold">
        Event page
      </div>
    </BodyLayout>
  );
}

export default Event;
