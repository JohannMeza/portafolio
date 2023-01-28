import React from "react";

export default function BannerComponent() {
  return (
    <div className="bg-banner">
      <div className="flex items-center justify-start min-h-screen bg-fixed box-base">
        <div className="flex items-start flex-col w-1/2">
          <h1 className="title-banner font-Poppins text-yellow-500">Hola!!!</h1>
          <hr className="w-full border-yellow-500 border-y-2 mt-4 mb-6" />
          <p className="text-white text-paragraph-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            voluptatem unde nemo ea consectetur sapiente facilis iusto deleniti
            quam nostrum beatae, repellendus a assumenda magnam quibusdam
            aliquid accusamus possimus totam?
          </p>
          <button className="button-base color-secondary mt-4">
            CONTACTAME
          </button>
        </div>
      </div>
    </div>
  );
}
