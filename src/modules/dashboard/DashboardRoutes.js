import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { classNames } from "../../util/ClassNames";
import { SaveRequestData } from "../../helpers/helpRequestBackend";
import SidebarComponent from "../../components/layout/sidebar/SidebarComponent";
import useMenuContext from "../../hooks/useMenuContext";
import useLoaderContext from "../../hooks/useLoaderContext";
import useAuthContext from "../../hooks/useAuthContext";
import PerfilRoutes from "./MiPerfil/MiPerfilRoutes";

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
            <Route path="/mi_perfil/*" element={<PerfilRoutes />}></Route>
          </Routes>
        </div>
      </main>
    </>
  );
}
