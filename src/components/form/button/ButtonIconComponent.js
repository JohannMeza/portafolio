import React from "react";
import { classNames } from "../../../util/ClassNames";
import { Tooltip, TooltipWrapper } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function ButtonIconComponent({ icon, className = "color-primary", onClick = {}, direction = 'top', title = '', position = 'absolute'}) {
  return (
    <div className={classNames('flex items-center justify-center')}>
      <TooltipWrapper content={title} place={direction} delayShow={125} delayHide={125} positionStrategy={position}>
        <div className="flex space-x-2 justify-center">
          <div>
            <button 
              type="button"
              className={classNames("button-icon-base", className)}
              onClick={onClick}
            >
              {icon}
            </button>
          </div>
        </div>
      </TooltipWrapper>
      <Tooltip />
    </div>
  );
}
