import { CircularProgress } from "@mui/material";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useAccount } from "../hooks/useAccount";
import { useGetAllApps } from "../hooks/useApp";
import { AccountData } from "../types/api/account";
import { AppData } from "../types/api/app";

export type AppContextData = {
  allApps: AppData[];
  selectedApp: AppData | undefined;
  setSelectedApp: (app: AppData) => void;
  account: AccountData;
};

const AppContext = React.createContext<AppContextData | undefined>(undefined);

export const AppContextProvider = ({ children }: any): ReactElement => {
  const [selectedApp, setSelectedApp] = useState<AppData>();

  const { data: accountData, isLoading: isAccountLoading } = useAccount();
  const { data: allApps, isLoading: isAppLoading } = useGetAllApps();

  useEffect(() => {
    if (!allApps) return;
    if (!selectedApp) {
      setSelectedApp(allApps[0]); // allApps > 0 is always true
      return;
    }
    const isAppDeleted =
      allApps.filter((app) => app.id === selectedApp.id).length === 0;
    if (isAppDeleted) setSelectedApp(allApps[0]);
  }, [allApps]);

  if (isAccountLoading || isAppLoading || !allApps || !accountData)
    return (
        <AppContext.Provider value={undefined}>{children}</AppContext.Provider>
    );

  return (
    <AppContext.Provider
      value={{
        allApps: allApps,
        selectedApp: selectedApp,
        account: accountData,
        setSelectedApp: setSelectedApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
