import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logotipo.svg";
import useMenuContext from "../../../hooks/useMenuContext";
import { classNames } from "../../../util/ClassNames";
import Controls from "../../Controls";
import Icon from "../../icon/Icon";

const heightHeader = 65;

export default function SidebarComponent() {
  const { menu, setMenu } = useMenuContext();
  const styleNavbar = { paddingTop: heightHeader + "px" };
  const styleHeader = { height: heightHeader + "px" };
  const styleLinkNav = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  };

  const handleClickLista = (e) => {
    e.target.closest("li").querySelector("ul").classList.toggle("show");
  };

  return (
    <header>
      {/* NAVBAR */}
      <div
        className={classNames(`z-[999998] overflow-y-auto scroll-base w-60 h-full top-0 pt-["${heightHeader}"] shadow-md bg-white fixed transition-[margin-left] duration-700"`, menu ? "" : "-ml-[100%]")}
        style={styleNavbar}
      >
        <div className="pt-4 pb-2 px-6">
          <Link href="#!">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                  className="rounded-full w-10"
                  alt="Avatar"
                />
              </div>
              <div className="grow ml-3">
                <p className="text-title-3 font-semibold text-blue-600">
                  Jason McCoel
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div>
          <span className="text-paragraph-3 font-Poppins font-semibold px-6">
            Dashboard
          </span>
          <ul className="relative px-1">
            <li className="relative">
              <Link
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                to="/dashboard/home/admin"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Home
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                to="/dashboard/menu/admin"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Menu
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                to="/dashboard/perfiles/admin"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Perfiles
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                to="/dashboard/home/comentario"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Permisos
                </span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                to="/dashboard/usuarios/admin"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Usuarios
                </span>
              </Link>
            </li>
            <li className="relative" id="sidenavSecEx2">
              <Controls.TooltipComponent
                className="flex select-none gap-2 items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
                onClick={handleClickLista}
                direction="right"
                title="Collapsible item 4567891"
              >
                <Icon.EyeSlash className="min-w-[20px] max-w-[20px] w-[20px]" />
                <span style={styleLinkNav}>Collapsible item 4567891</span>
                <Icon.ChevronDownIcon className="min-w-[20px] max-w-[20px] w-[20px]" />
              </Controls.TooltipComponent>
              <ul
                className="relative accordion-collapse collapse"
                id="collapseSidenavSecEx2"
                aria-labelledby="sidenavSecEx2"
                data-bs-parent="#sidenavSecExample"
              >
                <li className="relative">
                  <Link
                    href="#!"
                    className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="primary"
                  >
                    Link 1
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    href="#!"
                    className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="primary"
                  >
                    Link 2
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
            <a className="text-xl text-white pr-2 font-semibold" href="#">
              Navbar
            </a>
            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2">
                <a className="nav-link text-white" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  href="#"
                >
                  Team
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
                  href="#"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center relative">
            <a
              className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4"
              href="#"
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
            </a>
            <div className="dropdown relative">
              <a
                className="text-white opacity-60 hover:opacity-80 focus:opacity-80 mr-4 dropdown-toggle hidden-arrow flex items-center"
                href="#"
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
              </a>
              <ul
                className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Another action
                  </a>
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
              <a
                className="dropdown-toggle flex items-center hidden-arrow"
                href="#"
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
              </a>
              <ul
                className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    href="#"
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                    to="/logout"
                  >
                    Something else here
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
