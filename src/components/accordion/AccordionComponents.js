import React from "react";

export default function AccordionComponents({ children, target, checked }) {
  return (
    <div>
      <div className="bg-white">
        <h2 className="accordion-header mb-0" id={`heading-${target}`}>
          <button 
            className="accordion-button relative flex items-center w-full py-1 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" 
            type="button">
            {children[0]}
          </button>
        </h2>
        {
          children[1].props.children && 
          <div id={`collapse-${target}`} className={`collapse ${checked ? "show" : ""}`} aria-labelledby={`heading-${target}`}>
            <div className="accordion-body py-1 px-5">
              {children[1]}
            </div>
          </div>
        }
      </div>
    </div>
  );
}