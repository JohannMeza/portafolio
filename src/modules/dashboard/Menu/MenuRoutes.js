import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuAdminPage from './admin/MenuAdminPage';
import MenuDetailPage from './detail/MenuDetailPage';

export default function MenuRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<MenuAdminPage />} />
      <Route path="/nuevo" element={<MenuDetailPage />} />
      <Route path="/:id" element={<MenuDetailPage />} />
    </Routes>
  ) 
}