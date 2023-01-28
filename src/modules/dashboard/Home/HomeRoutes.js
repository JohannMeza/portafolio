import { Routes, Route } from "react-router-dom";
import HomeAdminPage from "./admin/HomeAdminPage";

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<HomeAdminPage />} />
      <Route path="/comentario" element={<h1>Hola</h1>} />
    </Routes>
  );
}
