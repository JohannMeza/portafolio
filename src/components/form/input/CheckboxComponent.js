import React from "react";
import { classNames } from "../../../util/ClassNames";

export default function CheckboxComponent({ className, onChange = {}, disabled = false, id = Date.now(), label, name = "", value = false }) {
  return (
    <div className={classNames("w-full input-checkbox-base", className)} onChange={onChange}>
      <input type="checkbox" checked={value[name]} id={id} disabled={disabled} name={name} />
      <label className="w-full" htmlFor={id}>{label}</label>
    </div>
  );
}
