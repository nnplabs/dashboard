import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./styles/global.css";
import "@near-wallet-selector/modal-ui-js/styles.css";

import { WalletSelectorContextProvider } from "./context/WalletSelectorContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
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
        <AppContextProvider>
          <ToastContainer />
          <App />
        </AppContextProvider>
      </WalletSelectorContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
