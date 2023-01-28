import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HeaderComponent from '../../components/layout/header/HeaderComponent';
import HomePage from './Home/admin/HomePage';

export default function FrontRoutes () { 
  return (
    <div>
      <HeaderComponent />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}