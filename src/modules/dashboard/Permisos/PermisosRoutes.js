import React from "react";
import { Route, Routes } from "react-router-dom";
import PermisosAdminPage from "./admin/PermisosAdminPage";
import PermisosDetailPage from "./detail/PermisosDetailPage";

export default function PermisosRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<PermisosAdminPage />} />
      <Route path="/nuevo" element={<PermisosDetailPage />} />
      <Route path="/:id" element={<PermisosDetailPage />} />
    </Routes>
  );
}
