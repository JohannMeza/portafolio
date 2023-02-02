import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CategoriasAdminPage from './admin/CategoriasAdminPage';
import CategoriasDetailPage from './detail/CategoriasDetailPage';

export default function CategoriasRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<CategoriasAdminPage />} />
      <Route path="/nuevo" element={<CategoriasDetailPage />} />
      <Route path="/:id" element={<CategoriasDetailPage />} />
    </Routes>
  )
}