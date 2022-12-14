import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { login } from "./api/authApi";
import { EventContextProvider } from "./context/EventContext";
import { useWalletSelector } from "./context/WalletSelectorContext";
import Log from "./pages/dashboard/Log";
import Metric from "./pages/dashboard/Metric";
import Login from "./pages/Login";
import Event from "./pages/management/Event/Event";
import Integration from "./pages/management/Integration/Integration";
import Settings from "./pages/management/Settings/Setting";
import Setting from "./pages/management/Settings/Setting";
import User from "./pages/management/User/User";
import RegisterAccount from "./pages/RegisterAccount";
import RequireAuth from "./pages/RequireAuth";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navigate to="/management/events" />
            </RequireAuth>
          }
        />
        <Route
          path="login"
          element={
            <RequireAuth>
              <Login />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/metrics"
          element={
            <RequireAuth>
              <Metric />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/logs"
          element={
            <RequireAuth>
              <Log />
            </RequireAuth>
          }
        />
        <Route
          path="/management/events"
          element={
            <RequireAuth>
              <EventContextProvider>
                <Event />
              </EventContextProvider>
            </RequireAuth>
          }
        />
        <Route
          path="/management/integrations"
          element={
            <RequireAuth>
              <Integration />
            </RequireAuth>
          }
        />
        <Route
          path="/management/users"
          element={
            <RequireAuth>
              <User />
            </RequireAuth>
          }
        />
        <Route
          path="/management/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/register"
          element={
            <RequireAuth>
              <RegisterAccount />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
