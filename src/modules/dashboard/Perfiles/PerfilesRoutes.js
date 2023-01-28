import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PerfilesAdminPage from './admin/PerfilesAdminPage';
import PerfilesDetailPage from './detail/PerfilesDetailPage';
import PerfilesPermisosPage from './detail/PerfilesPermisosPage';

export default function PerfilesRoutes () {
  return (
    <Routes>
      <Route path="/admin" element={<PerfilesAdminPage />} />
      <Route path="/nuevo" element={<PerfilesDetailPage />} />
      <Route path="/:id" element={<PerfilesDetailPage />} />
      <Route path="/permisos/:id" element={<PerfilesPermisosPage />} />
    </Routes>
  )
}