import React from "react";
import { classNames } from "../../../util/ClassNames";

export default function CheckboxComponent({ value, className, disabled = false, id = Date.now(), label }) {
  return (
    <div className={classNames("input-checkbox-base", className)}>
      <input type="checkbox" value={value} id={id} disabled={disabled} />
      <label style={{ lineHeight: 0 }} for={id}>{label}</label>
    </div>
  );
}
