import { Routes, Route } from "react-router-dom";
import UsuariosAdminPage from "./admin/UsuariosAdminPage";
import UsuariosDetailPage from "./detail/UsuariosDetailPage";

export default function UsuariosRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<UsuariosAdminPage />} />
      <Route path="/nuevo" element={<UsuariosDetailPage />} />
      <Route path="/:id" element={<UsuariosDetailPage />} />
    </Routes>
  );
}
