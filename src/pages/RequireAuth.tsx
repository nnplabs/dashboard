import React, { ReactElement, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useWalletSelector } from "../context/WalletSelectorContext";

function RequireAuth({ children }: { children: ReactElement }) {
  const app = useAppContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const registerCheck =
    app &&
    app.account &&
    app.account.contractAddress === app.account.ownerAddress;
  useEffect(() => {
    if (pathname === "/login" && app && !app.account) {
      // do nothing
    } else if (pathname === "/login" && app && app.account && !registerCheck) {
      navigate("/");
    } else if (app && !app.account) {
      navigate("/login");
    } else if (pathname === "/register" && registerCheck) {
      // do nothing
    } else if (pathname === "/register" && !registerCheck) {
      navigate("/");
      // do nothing
    } else if (registerCheck) {
      navigate("/register");
    }
  }, [app, navigate, pathname]);

  return children;
}

export default RequireAuth;
