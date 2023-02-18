import React from 'react';
import { Route, Routes } from 'react-router';
import PublicacionesAdminPage from './admin/PublicacionesAdminPage';
import PublicacionesDetailPage from './detail/PublicacionesDetailPage';

export default function PublicacionesRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<PublicacionesAdminPage />} />
      <Route path="/nuevo" element={<PublicacionesDetailPage />} />
      <Route path="/:id" element={<PublicacionesDetailPage />} />
    </Routes>
  )
}