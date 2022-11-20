import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setupWalletSelector } from "@near-wallet-selector/core";
import type { WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { distinctUntilChanged, map } from "rxjs";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { login } from "../api/authApi";
import { useAppContext } from "./AppContext";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider = ({
  children,
}: any): ReactElement => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const app = useAppContext();

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: "mainnet",
      debug: true,
      modules: [setupNearWallet(), setupSender(), setupMyNearWallet()],
    });
    const _modal = setupModal(_selector, { contractId: "test.near" });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector || !app) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state: { accounts: any }) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);
        if (nextAccounts.length > 0) {
          if (!app.account) {
            console.log("Dhalaaaaaaa bitchhhhhh")
            login(nextAccounts[0].accountId).then((res) => {
              console.log("Hooooooooooooo ", app);
              document.location.reload()
              //document.location.href = "/register";
              //window.location.reload()
              // appContext?.setSelectedApp({
              //   id: res.appId,
              //   name: res.appName,
              //   description: res.appDescription,
              //   createdAt: res.createdAt,
              //   updatedAt: res.updatedAt,
              //   ownerAddress: res.ownerAddress,
              //   metadata: res.metadata,
              // });
            });
          }
        }
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [selector, app]);

  if (!selector || !modal) {
    return (
      <WalletSelectorContext.Provider value={null}>
        {children}
      </WalletSelectorContext.Provider>
    );
  }

  const accountId =
    accounts.find((account) => account.active)?.accountId || null;

  return (
    <WalletSelectorContext.Provider
      value={{
        selector,
        modal,
        accounts,
        accountId,
      }}
    >
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  //   if (!context) {
  //     throw new Error(
  //       "useWalletSelector must be used within a WalletSelectorContextProvider"
  //     );
  //   }

  return context;
}
