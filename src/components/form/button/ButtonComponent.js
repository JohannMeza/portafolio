import React from 'react';
import { classNames as concat } from '../../../util/ClassNames';

export default function ButtonComponent ({ title, style, className = false, onClick }) {
  return (
    <div>
      <button 
        data-mdb-ripple="true"
        className={concat(
          "button-base",
          "text-button-3",
          "color-primary",
          className
        )}
        style={style}
        onClick={onClick}
      >
        { title }
      </button>
    </div>
  )
}