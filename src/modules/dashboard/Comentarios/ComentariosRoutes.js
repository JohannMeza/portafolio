import React from 'react';
import { Route, Routes } from 'react-router';
import ComentariosAdminPage from './admin/ComentariosAdminPage';
import ComentariosDetailPage from './detail/ComentariosDetailPage';

export default function ComentariosRoutes() {

  return (
    <Routes>
      <Route path="/admin" element={<ComentariosAdminPage />}  />
      <Route path="/:id" element={<ComentariosDetailPage />}  />
    </Routes>    
  )
}