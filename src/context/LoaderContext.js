import React, { createContext, useMemo, useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";
import Controls from "../components/Controls";
import { classNames } from "../util/ClassNames";

export const LoaderContext = createContext();

export default function LoaderContextProvider({ children }) {
  const [loader, setLoader] = useState(false);

  const value = useMemo(() => ({ setLoader: (value) => setLoader(value) }), []);

  return (
    <LoaderContext.Provider value={value}>
      <div className={classNames(loader ? "loader-base visible" : "visually-hidden")}>
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loader}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
        <Controls.ButtonComponent onClick={() => setLoader(false)} title="Cancelar" className="color-secondary mt-5" />
      </div>
      {children}
    </LoaderContext.Provider>
  );
}
