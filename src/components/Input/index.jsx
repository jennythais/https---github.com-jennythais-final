import React from "react";
import { forwardRef } from "react";
export const InputR = (
  { label, required, error, renderInput, name = "", ...inputProps },
  ref
) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...inputProps, ref: ref }) || (
        <input
          ref={ref}
          type="text"
          className={`form-control ${error ? "input-error" : ""}`}
          name={name}
          id={name}
          {...inputProps}
        />
      )}
      <p className="form-error" style={{ minHeight: 23 }}>
        {error || ""}
      </p>
    </div>
  );
};

export const Input = forwardRef(InputR);
