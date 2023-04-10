import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SaveRequestData } from "../../../helpers/helpRequestBackend";
import useAuthContext from "../../../hooks/useAuthContext";
import useLoaderContext from "../../../hooks/useLoaderContext";
import { classNames } from "../../../util/ClassNames";
import Icon from "../../icon/Icon";

const styleLinkNav = { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" };
const listPerfil = [{ to: '/dashboard/mi_perfil/admin', label: 'Mi Perfil' }]
const heightHeader = 65;

export default function SidebarComponent({ menu, setMenu }) {
  const { user } = useAuthContext();
  const { setLoader } = useLoaderContext();
  const [menus, setMenus] = useState([]);
  const styleNavbar = { paddingTop: heightHeader + "px" };
  const styleHeader = { height: heightHeader + "px" };
  const getMenus = () => { 
    setLoader(true)
    SaveRequestData({
      queryId: 15,
      body: { ID_PERFIL: user.ID_PERFILES },
      success: (resp) => {
        setLoader(false)
        setMenus(resp.dataList)
      },
      error: (err) => {
        setLoader(false)
        const { message, status } = err;
        (status < 500) && alert.error(message)
      }
    })
  }
  
  useEffect(() => {
    (user) && getMenus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.ID_PERFILES])

  return (
    <header>
      {/* NAVBAR */}
      <div
        className={classNames(`z-[999998] overflow-y-auto scroll-base w-60 h-full top-0 pt-["${heightHeader}"] shadow-md bg-white fixed transition-[margin-left] duration-700"`, menu ? "" : "-ml-[100%]")}
        style={styleNavbar}
      >
        {/* Nombre de Usuario */}
        <div className="pt-4 pb-2 px-6">
          <Link to="#">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                  className="rounded-full w-10"
                  alt="Avatar"
                />
              </div>
              <div className="grow ml-3">
                <p className="text-title-3 font-semibold text-blue-600" style={styleLinkNav}>
                  {user?.NOMBRE} {user?.APELLIDO}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Lista de Menus */}
        {
          menus.map((menu_1, index) => (
            <LinkComponent key={index} menu={menu_1}>
              {
                menu_1.sub_menus.map((menu_2, index) => (
                  <LinkComponent key={index} menu={menu_2}>
                    {
                      menu_2.sub_menus.map((menu_3, index) => (
                        <LinkComponent key={index} menu={menu_3}></LinkComponent>
                      ))
                    }
                  </LinkComponent>
                ))
              }
            </LinkComponent>
          ))
        }
      </div>

      {/* HEADER */}
      <nav
        className={classNames(
          "z-[999999] flex flex-wrap items-center justify-between bg-primary text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light",
          `h-[${heightHeader}] navbar navbar-expand-lg navbar-light fixed-top`
        )}
        style={styleHeader}
      >
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <button
            onClick={() => setMenu(!menu)}
            className={classNames(
              "hamburger hamburger--collapse scale-75",
              menu ? "is-active" : ""
            )}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <button
            className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
          <div
            className="collapse navbar-collapse flex-grow items-center"
            id="navbarSupportedContent1"
          >
            <Link className="text-xl text-white pr-2 font-semibold" to="#">
              Navbar
            </Link>
            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <Link className="nav-link text-white" to="#">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  to="#"
                >
                  Team
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  to="#"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center relative">
            <Link
              className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4"
              to="#"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                ></path>
              </svg>
            </Link>
            <div className="dropdown relative">
              <Link
                className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4 dropdown-toggle hidden-arrow flex items-center"
                to="#"
                id="dropdownMenuButton1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bell"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                  ></path>
                </svg>
                <span className="text-white bg-red-700 absolute rounded-full text-xs -mt-2.5 ml-2 py-0 px-1.5">
                  1
                </span>
              </Link>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="#"
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="#"
                  >
                    Another action
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dropdown relative">
              <Link
                className="dropdown-toggle flex items-center hidden-arrow"
                to="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                  className="rounded-full"
                  style={{ height: "25px", width: "25px" }}
                  alt=""
                  loading="lazy"
                />
              </Link>
              <ul
                className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                { listPerfil.map((el, index) => <ListaComponent key={index} to={el.to} label={el.label} />) }
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

const ListaComponent = ({ to, label }) => {
  return (
    <li>
      <Link className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" to={to}>{ label }</Link>
    </li>
  )
}

const LinkComponent = ({ children, menu }) => {
  return (
    <div>
      <LabelComponent menu={menu} id="menu2" />

      <ul className="relative">
        {children}
      </ul>
    </div>
  )
}

const LabelComponent = ({ menu }) => {
  return (
    <>
      {
        (menu.id_estado_menu === 6) ?
          (
            <span className="text-paragraph-3 font-Poppins font-semibold px-6" id="menu2">{menu.menu}</span>
          ) : (menu.sub_menus?.length > 0) ?
            (
              <div title={menu.menu}>
                <div className="flex gap-2">
                  <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                  <span style={styleLinkNav}>{menu.menu}</span>
                </div>
                <Icon.ChevronDownIcon className="min-w-[20px] max-w-[20px] w-[20px]" />
              </div>
            ) : (
              <li className="relative" title={menu.menu}>
                <Link
                  className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                  to={`/dashboard/${menu.ruta}`}
                >
                  <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                  <span style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{menu.menu}</span>
                </Link>
              </li>
            )
      }
    </>
  )
}