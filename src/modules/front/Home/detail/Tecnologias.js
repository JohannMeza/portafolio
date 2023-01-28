import React from "react";
import TechNodejs from "../../../../assets/tech/nodejs.png";

export default function Tecnologias() {
  return (
    <div className="box-base flex justify-center">
      <div
        className="flex items-stretch relative bg-banner-tech bg-no-repeat p-12"
        style={{ width: "85%", height: "450px", backgroundSize: "contain" }}
      >
        <div className="flex justify-center flex-col items-start w-1/2">
          <h2 className="title-banner text-white font-Poppins text-[60px]">
            Node JS
          </h2>
          <p className="text-white font-OpenSans text-paragraph-2 font-normal mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quae
            porro commodi suscipit!
          </p>
        </div>
        <div className="flex justify-center items-center w-1/2">
          <div
            className="absolute right-0 rounded-full border-[25px] border-[transparent]"
            style={{ boxShadow: "0 0 0px 1.5px white" }}
          >
            <div
              className="flex justify-center items-center bg-[#8AC400] w-[350px] h-[350px]"
              style={{
                clipPath:
                  "polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
              }}
            >
              <img src={TechNodejs} alt="" className="w-[80%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
