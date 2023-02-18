import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EtiquetasAdminPage from './admin/EtiquetasAdminPage';
import EtiquetasDetailPage from './detail/EtiquetasDetailPage';

export default function EtiquetasRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<EtiquetasAdminPage />} />
      <Route path="/:id" element={<EtiquetasDetailPage />} />
      <Route path="/nuevo" element={<EtiquetasDetailPage />} />
    </Routes>
  )
}