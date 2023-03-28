import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderComponent from '../../components/layout/header/HeaderComponent';
import BlogPage from './Blog/admin/BlogPage';
import PublicacionPage from './Blog/admin/PublicacionPage';
import HomePage from './Home/admin/HomePage';

export default function FrontRoutes () { 
  return (
    <div>
      <HeaderComponent />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:categoria/:id" element={<PublicacionPage />} />
        </Routes>
      </div>
    </div>
  )
}