import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { PATHS } from "../../constants/path";
import ProductDetailTab from "./ProductDetailTab";
import ProductDetailTop from "./ProductDetailTop";
import useProductDetail from "./useProductDetail";

const ProductDetailPage = () => {
  const { productName, productDetailTopProps, productDetailTabProps } =
    useProductDetail();

  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>{productName || ""}</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...productDetailTopProps} />
          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
