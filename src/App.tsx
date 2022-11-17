import { CircularProgress } from "@mui/material";
import { useAppContext } from "./context/AppContext";
import AppRoutes from "./Routes";

export default function App() {
  const data = useAppContext();
  if (!data)
    return (
      <div className="h-full w-full flex">
        <CircularProgress className="m-auto" />
      </div>
    );
  return <AppRoutes />;
}
