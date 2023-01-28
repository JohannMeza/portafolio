import React from "react";
import CardImage from "../../../../assets/imagenes/card.png";
import Icon from "../../../../components/icon/Icon";

export default function Proyectos() {
  return (
    <div className="box-base">
      <section className="text-gray-600 body-font">
        <div className="container">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-title-3 font-Poppins font-semibold text-secondary">
              Valores
            </h2>
            <h3 className="text-center text-title-2 font-Poppins font-semibold text-primary">
              Mis valores diferenciales
            </h3>
            <p className="text-center w-2/4 font-OpenSans font-normal text-paragraph-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
              facilis et laborum provident quas explicabo aperiam omnis sequi
              voluptate ut iusto, quia distinctio dolorum natus perferendis odit
              aliquid minima enim.
            </p>
          </div>

          <br />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-8 h-[450px]">
            <div className="hover:shadow-xl hover:text-secondary hover:z-10 relative border-solid border border-[#D7D7D7]">
              <div className="flex flex-col rounded-lg bg-white h-full">
                <img src={CardImage} alt="" />
                <div className="flex flex-col justify-between px-8 h-full">
                  <h4 className="text-title-3 font-Poppins text-gray-900 text-lg font-bold mt-6 text-start">
                    Total Ballance 1
                  </h4>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="text-button-1 uppercase font-Poppins font-semibold text-start text-text"
                    >
                      READ MORE
                    </a>
                    <Icon.ArrowRight className="icon-principal text-text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7]">
              <div className="flex flex-col hover:text-secondary rounded-lg bg-white h-full">
                <img src={CardImage} alt="" />
                <div className="flex flex-col justify-between px-8 h-full">
                  <h4 className="text-title-3 font-Poppins text-gray-900 text-lg font-bold mt-6 text-start">
                    Total Ballance 1
                  </h4>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="text-button-1 uppercase font-Poppins font-semibold text-start text-text"
                    >
                      READ MORE
                    </a>
                    <Icon.ArrowRight className="icon-principal text-text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7]">
              <div className="flex flex-col hover:text-secondary rounded-lg bg-white h-full">
                <img src={CardImage} alt="" />
                <div className="flex flex-col justify-between px-8 h-full">
                  <h4 className="text-title-3 font-Poppins text-gray-900 text-lg font-bold mt-6 text-start">
                    Total Ballance 1
                  </h4>
                  <div className="flex items-center justify-between">
                    <a
                      href="#"
                      className="text-button-1 uppercase text-text font-Poppins font-semibold text-start"
                    >
                      READ MORE
                    </a>
                    <Icon.ArrowRight className="icon-principal text-text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
