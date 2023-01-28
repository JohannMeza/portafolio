import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarComponent from '../../components/layout/sidebar/SidebarComponent';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import useMenuContext from '../../hooks/useMenuContext';
import { classNames } from '../../util/ClassNames';
import HomeRoutes from './Home/HomeRoutes';
import PerfilesRoutes from './Perfiles/PerfilesRoutes';
import UsuariosRoutes from './Usuarios/UsuariosRoutes';
import { AlertsConfig } from '../../config/AlertConfig';
import MenuRoutes from './Menu/MenuRoutes';

export default function DashboardRoutes () {
  const { menu } = useMenuContext()

  return (
    <AlertProvider template={AlertTemplate} {...AlertsConfig}>
        <SidebarComponent />

        <main style={{marginTop: "65px"}} className={classNames("min-h-screen bg-white-200 p-8 transition-[margin-left] duration-300", menu ? "ml-[240px]" : "")}>
          <div>
            <Routes>
              <Route path="/home/*" element={<HomeRoutes />} />
              <Route path="/usuarios/*" element={<UsuariosRoutes />} />
              <Route path="/perfiles/*" element={<PerfilesRoutes />} />
              <Route path="/menu/*" element={<MenuRoutes />} />
            </Routes>
          </div>
        </main>
    </AlertProvider>
  )
}