import React from "react";
import ProductColor from "../../components/ProductColor";
import ProductImageZoom from "../../components/ProductImageZoom";
import QuantityInput from "../../components/QuantityInput";
import { PATHS } from "../../constants/path";
import { formatCurrency } from "../../utils/format";
import { transformToPercent } from "../../utils/transform";

const ProductDetailTop = ({
  name,
  rating,
  price,
  description,
  images,
  category,
  color,
  stock,
  colorRef,
  quantityRef,
  handleAddToCart,
}) => {
  const pathURL = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;

  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart?.();
  };
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${transformToPercent(rating)}` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ({rating} Reviews )
              </a>
            </div>
            <div className="product-price"> ${formatCurrency(price)} </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor ref={colorRef} colors={color} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <QuantityInput max={stock} ref={quantityRef} />
              </div>
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={_onAddToCart}
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <a href="#">{category?.name}</a>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <a
                  href="#"
                  className="social-icon"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTop;
