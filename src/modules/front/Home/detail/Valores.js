import React from "react";
import CientificoSvg from "../../../../assets/icon/cientifico.svg";
import EticaSvg from "../../../../assets/icon/etica.svg";
import IntegridadSvg from "../../../../assets/icon/integridad.svg";
import LibertadSvg from "../../../../assets/icon/libertad.svg";
import SabiduriaSvg from "../../../../assets/icon/sabiduria.svg";
import VerdadSvg from "../../../../assets/icon/verdad.svg";

export default function Valores() {
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center">
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center  justify-between  rounded-lg bg-white">
                <img src={CientificoSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance 1
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center justify-between rounded-lg bg-white">
                <img src={EticaSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center justify-between rounded-lg bg-white">
                <img src={IntegridadSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center justify-between rounded-lg bg-white">
                <img src={LibertadSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center justify-between rounded-lg bg-white">
                <img src={SabiduriaSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
            <div className="hover:shadow-xl hover:z-10 relative border-solid border border-[#D7D7D7] px-4 py-10">
              <div className="flex flex-col items-center justify-between rounded-lg bg-white">
                <img src={VerdadSvg} alt="" />
                <h4 className="text-title-3 font-Poppins text-primary text-gray-900 text-lg font-bold mt-6">
                  Total Ballance
                </h4>
                <p className="font-OpenSans text-paragraph-2 font-normal text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                  explicabo veniam voluptates, necessitatibus facilis laboriosam
                  suscipit{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
