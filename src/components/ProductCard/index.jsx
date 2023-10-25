import { Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../../constants/path";
import { formatCurrency } from "../../utils/format";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;
const ProductCard = ({ product }) => {
  const { id, slug, title, price, rating, images, discount } = product || {};
  const productPath = PATHS.PRODUCTS + `/${slug}`;

  // const _onAddCart = (e) => {
  //   e?.preventDefault();

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    window.location.href = productPath;
  };

  return (
    <div className="product product-2">
      <figure className="product-media">
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath} style={{ height: 275 }}>
          {images?.length > 0 ? (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageWrapper>
              <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a
            role="button"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={handleAddToCartClick}
          >
            <span style={{cursor: "pointer"}}>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{title || ""}</Link>
        </h3>
        <div className="product-price">
          {discount ? (
            <>
              {" "}
              <span className="new-price">
                ${formatCurrency(price - discount)}
              </span>
              <span className="old-price">Was ${formatCurrency(price)}</span>{" "}
            </>
          ) : (
            <>${formatCurrency(price || 0)}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating || 0) * 20}%` }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
