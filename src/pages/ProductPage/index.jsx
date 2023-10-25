import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Pagination from "../../components/Pagination";
import { PATHS } from "../../constants/path";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import ProductToolbox from "./ProductToolbox";
import useProductPage from "./useProductPage";
const ProductPage = () => {
  const { productListProps, paginationProps, toolboxProps, filterProps } = useProductPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item>
          <Link to={PATHS.HOME}>Home</Link>
        </BreadCrumb.Item>
        <BreadCrumb.Item isActive>Product</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolbox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...paginationProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
