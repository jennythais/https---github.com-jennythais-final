import React, { forwardRef, useImperativeHandle } from "react";
import { useState } from "react";

const ProductColor = ({ colors, defaultColor, onChange }, ref) => {
  const [selectorColor, setSelectorColor] = useState(defaultColor);
  useImperativeHandle(ref, () => {
    return {
      value: selectorColor,
      reset: () => {
        setSelectorColor(defaultColor);
      },
    };
  });
  const _onColorChange = (e, color) => {
    e.stopPropagation();
    setSelectorColor(color);
    onChange?.(color);
  };
  return (
    <div className="product-nav product-nav-dots">
      {colors?.map((color, index) => (
        <div
          key={index}
          onClick={(e) => _onColorChange(e, color)}
          className={`product-nav-item ${
            selectorColor === color ? "active" : ""
          } `}
          style={{ background: `${color}` }}
        >
          <span className="sr-only">{color}</span>
        </div>
      ))}
    </div>
  );
};

export default forwardRef(ProductColor);
