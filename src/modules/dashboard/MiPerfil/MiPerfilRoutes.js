import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PerfilAdminPage from './admin/MiPerfilAdminPage';

export default function PerfilRoutes () {
  return (
    <Routes>
      <Route path="admin" element={<PerfilAdminPage />} />
    </Routes>
  )
}