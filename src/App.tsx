import { CircularProgress } from "@mui/material";
import { useAppContext } from "./context/AppContext";
import AppRoutes from "./Routes";

export default function App() {
  const data = useAppContext();
  console.log("He he he ", data);
  return !data ? (
    <div className="h-full w-full flex">
      <CircularProgress className="m-auto" />
    </div>
  ) : (
    <AppRoutes />
  );
}
