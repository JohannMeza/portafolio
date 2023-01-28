import React from "react";

export default function CardsComponent() {
  return (
    <div className="min-w-screen my-24 bg-gray-200 flex items-center justify-center box-base">
      <div className="w-full max-w-3xl">
        <div className="-mx-2 md:flex">
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <span className="font-Poppins text-secondary font-semibold text-title-1 my-3">
                    10 +
                  </span>
                  <p className="font-Poppins text-secondary font-semibold text-span-1">
                    PROYECTOS COMPLETADOS
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <span className="font-Poppins text-secondary font-semibold text-title-1 my-3">
                    7 +
                  </span>
                  <p className="font-Poppins text-secondary font-semibold text-span-1">
                    CLIENTES SATISFECHOS
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2">
            <div className="rounded-lg shadow-sm mb-4">
              <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                <div className="px-3 pt-8 pb-10 text-center relative z-10">
                  <span className="font-Poppins text-secondary font-semibold text-title-1 my-3">
                    3 +
                  </span>
                  <p className="font-Poppins text-secondary font-semibold text-span-1">
                    AÑOS DE EXPERIENCIA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
