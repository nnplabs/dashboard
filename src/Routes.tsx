import { Login } from "@mui/icons-material";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useWalletSelector } from "./context/WalletSelectorContext";
import Log from "./pages/dashboard/Log";
import Metric from "./pages/dashboard/Metric";
import Event from "./pages/management/Event";
import Integration from "./pages/management/Integration/Integration";
import Setting from "./pages/management/Setting";
import RequireAuth from "./pages/RequireAuth";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/management/events" />} />
        <Route path="login" element={
        <RequireAuth><Login /></RequireAuth>} />
        <Route path="/dashboard/metrics" element={
          <RequireAuth>
            <Metric />
          </RequireAuth>
        } />
        <Route path="/dashboard/logs" element={
         <RequireAuth>
          <Log />
       </RequireAuth>
        } />
        <Route path="/management/events" element={
         <RequireAuth>
          <Event />
       </RequireAuth>
        } />
        <Route path="/management/integrations" element={
         <RequireAuth>
          <Integration />
       </RequireAuth>
        } />
        <Route path="/management/settings" element={
         <RequireAuth>
          <Setting />
        </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}
