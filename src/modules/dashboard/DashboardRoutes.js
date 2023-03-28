import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../../components/layout/sidebar/SidebarComponent";
import useMenuContext from "../../hooks/useMenuContext";
import { classNames } from "../../util/ClassNames";
import useLoaderContext from "../../hooks/useLoaderContext";
import { SaveRequestData } from "../../helpers/helpRequestBackend";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";

export default function DashboardRoutes() {
  const { menu, setMenu } = useMenuContext();
  const { setLoader } = useLoaderContext();
  const { user } = useAuthContext();
  const [arrModules, setArrModules] = useState([])

  const getRouters = () => {
    setLoader(true);
    SaveRequestData({
      queryId: 35,
      body: { ID_PERFIL: user.ID_PERFILES },
      success: (resp) => {
        setLoader(false);
        let arrFileComponents = []
        resp.dataList.forEach(el => {
          if (el.ruta && el.componente) {
            let rutaBase = el.ruta.split('/')[0]
            
            import(`./${el.componente}`)
            .then((module) => {
              setArrModules((arrModules) => [...arrModules, {ruta: `/${rutaBase}/*`, componente: React.createElement(module.default)}])
            })
            .catch((err) => {
              console.log(err);
            });
          }
        })
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      },
    });
  };

  useEffect(() => {
    user?.ID_PERFILES && getRouters()
  }, [user?.ID_PERFILES]);

  return (
    <>
      <SidebarComponent menu={menu} setMenu={setMenu} />

      <main
        style={{ marginTop: "65px" }}
        className={classNames(
          "min-h-screen bg-white-200 p-8 transition-[margin-left] duration-300",
          menu ? "ml-[240px]" : ""
        )}
      >
        <div>
          <Routes>
              {arrModules.length > 0 && arrModules.map((el, index) => ((el.ruta && el.componente) && <Route path={el.ruta} key={index} element={el.componente} />))}
          </Routes>

          {/* <Routes>
            <Route path="/home/*" element={<HomeRoutes />} />
            <Route path="/usuarios/*" element={<UsuariosRoutes />} />
            <Route path="/perfiles/*" element={<PerfilesRoutes />} />
            <Route path="/menu/*" element={<MenuRoutes />} />
            <Route path="/permisos/*" element={<PermisosRoutes />} />
            <Route path="/categorias/*" element={<CategoriasRoutes />} />
            <Route path="/comentarios/*" element={<ComentariosRoutes />} />
            <Route path="/publicaciones/*" element={<PublicacionesRoutes />} />
            <Route path="/etiquetas/*" element={<EtiquetasRoutes />} />
          </Routes> */}
        </div>
      </main>
    </>
  );
}
