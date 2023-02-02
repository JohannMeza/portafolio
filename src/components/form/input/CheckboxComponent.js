import React from "react";
import { classNames } from "../../../util/ClassNames";

export default function CheckboxComponent({ className, onChange = {}, disabled = false, id = Date.now(), label, name = "", value = false }) {
  return (
    <div className={classNames("w-full input-checkbox-base", className)}>
      <input type="checkbox" checked={value[name] || false} id={id} disabled={disabled} onChange={onChange} name={name} />
      <label className="w-full" htmlFor={id}>{label}</label>
    </div>
  );
}
