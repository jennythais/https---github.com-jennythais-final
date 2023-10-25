import React from "react";

export const Select = ({
  label,
  options = [],
  value = "",
  className,
  defaultValue,
  onChange = () => {},
  ...rest
}) => {
  return (
    <div className={className}>
      <label htmlFor="sortby">{label}</label>
      <div className="select-custom">
        <select
          className="form-control"
          value={value || ""}
          onChange={onChange}
          defaultValue={""}
          {...rest}
        >
          {options.map((option, index) => (
            <option key={option.value || index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
