import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { removeProduct } from "../../store/reducers/cartReducer";
import { handleShowedMenuMobile } from "../../store/reducers/mainReducer";
import { MenuStyled } from "../StyledComponents";

const HeaderMiddle = () => {
  const dispatch = useDispatch();
  const isMenuMobileOpen = useSelector((state) => state.main.isMenuMobileOpen);
  const cart = useSelector((state) => state.cart);
  const cartProduct = cart?.cartInfo?.product || {};
  // console.log("info", cart?.cartInfo);
  // console.log("cartProduct", cartProduct);
  useEffect(() => {
    if (isMenuMobileOpen) {
      document.body.classList.add("mmenu-active");
    }
  }, [isMenuMobileOpen]);
  const _showMenu = () => {
    dispatch(handleShowedMenuMobile());
  };

  const _onRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };
  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler" onClick={_showMenu}>
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuStyled className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </MenuStyled>
        </nav>
        <div className="header-right">
          <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="dropdown cart-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              {!!cartProduct.length && (
                <span className="cart-count">{cartProduct.length}</span>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-cart-products">
                {!!cartProduct &&
                  cartProduct.length > 0 &&
                  cartProduct.map((product, index) => (
                    <div className="product" key={index}>
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <Link to={`${PATHS.PRODUCTS}/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">
                            {cart?.cartInfo?.quantity[index]}
                          </span>{" "}
                          x ${cart?.cartInfo?.totalProduct[index]}{" "}
                        </span>
                      </div>
                      <figure className="product-image-container">
                        <Link
                          to={PATHS.PRODUCTS_DETAIL}
                          className="product-image"
                        >
                          <img
                            src={
                              cartProduct[index].images[0 || 1 || images.length]
                            }
                            alt="product"
                          />
                        </Link>
                      </figure>
                      <a
                        href="#"
                        className="btn-remove"
                        title="Remove Product"
                        onClick={_onRemoveProduct}
                      >
                        <i className="icon-close" />
                      </a>
                    </div>
                  ))}
              </div>
              <div className="dropdown-cart-total">
                <span>Total</span>
                {cart?.cartInfo && (
                  <span className="cart-total-price">
                    ${cart?.cartInfo.total}
                  </span>
                )}
              </div>
              <div className="dropdown-cart-action">
                <Link to={PATHS.CART} className="btn btn-primary">
                  View Cart
                </Link>
                <Link to={PATHS.CHECKOUT} className="btn btn-outline-primary-2">
                  <span>Checkout</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
