import React from "react";
import { Select } from "../../components/Select";
import { OPTIONS } from "../../constants/general";

const ProductToolbox = ({
  showNumber,
  totalNumber,
  activeSort,
  onSortChange,
}) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {showNumber || 0} of {totalNumber || 0}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <div className="toolbox-right">
        <Select
          label="Sort by:"
          className="toolbox-sort"
          value={activeSort}
          defaultValue={OPTIONS.popularity.value}
          options={[
            OPTIONS.popularity,
            OPTIONS.pricelow,
            OPTIONS.pricehigh,
            OPTIONS.newest,
            OPTIONS.mostrate,
          ]}
          onChange={onSelectChange}
        />
      </div>
    </div>
  );
};

export default ProductToolbox;
