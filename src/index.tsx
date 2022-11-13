import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./styles/global.css";
import '@near-wallet-selector/modal-ui-js/styles.css'

import { WalletSelectorContextProvider } from "./context/WalletSelectorContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletSelectorContextProvider>
        <App />
      </WalletSelectorContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
