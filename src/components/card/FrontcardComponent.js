import React from "react";
import { classNames } from "../../util/ClassNames";
import Controls from "../Controls";

export default function FrontCardComponent({ className = '', title, navigate = () => {}, image, descripcionCorta = "" }) {
  return (
    <article className={classNames(className, "rounded-lg hover:shadow-xl overflow-hidden hover:text-secondary hover:z-10 relative max-w-[600px]")}>
      <div className="flex flex-col bg-white h-full">
        <img src={image} alt="" className="h-[200px] w-full object-cover" />
        <div className="flex flex-col justify-between px-8 pb-8 h-full">
          <h4 className="text-title-3 font-Poppins text-gray-900 text-lg font-bold mt-6 text-start">{title}</h4>
          <p className="text-justify mt-2 text-paragraph-2 font-OpenSans text-text">{descripcionCorta}</p>
          <br />
          <Controls.ButtonComponent title="Ver Publicación" onClick={navigate} />
        </div>
      </div>
    </article>
  );
}
