import { Routes, Route } from "react-router-dom";
import BlogPage from "./admin/BlogPage";
import PublicacionPage from "./admin/PublicacionPage";

export default function BlogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BlogPage />} />
      <Route path="/:categoria/:id" element={<PublicacionPage />} />
      <Route path="/:id" element={<PublicacionPage />} />
    </Routes>
  );
}
