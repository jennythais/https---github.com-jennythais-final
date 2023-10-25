import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { handleClosedMenuMobile } from "../../store/reducers/mainReducer";
import cn from "../../utils/cn";

const MENUS = {
  menu: "menu",
  cate: "categories",
};
const MenuMobile = () => {
  // const { handleClosedMenuMobile } = useMainContext();
  const dispatch = useDispatch();
  const isMenuMobileOpen = useSelector((state) => state.main.isMenuMobileOpen);
  // console.log("is", isMenuMobileOpen);
  useEffect(() => {
    if (!!!isMenuMobileOpen) {
      document.body.classList.remove("mmenu-active");
    }
  }, [isMenuMobileOpen]);
  const _onCloseMenu = () => {
    dispatch(handleClosedMenuMobile());
  };
  const [selectedTab, setSelectedTab] = useState(MENUS.menu);
  const _onChangeTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };
  return (
    <>
      <div className="mobile-menu-overlay" onClick={_onCloseMenu} />
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={_onCloseMenu}>
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.menu,
                })}
                href="#mobile-menu-tab"
                onClick={(e) => _onChangeTab(e, MENUS.menu)}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.cate,
                })}
                href="#mobile-cats-tab"
                onClick={(e) => _onChangeTab(e, MENUS.cate)}
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENUS.menu,
                active: selectedTab === MENUS.menu,
              })}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li>
                    <Link to={PATHS.HOME}>Home</Link>
                  </li>
                  <li>
                    <Link to={PATHS.ABOUT}>About Us</Link>
                  </li>
                  <li>
                    <Link to={PATHS.PRODUCTS}>Product</Link>
                  </li>
                  <li>
                    <Link to={PATHS.BLOG}>Blog</Link>
                  </li>
                  <li>
                    <Link to={PATHS.CONTACT}>Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENUS.cate,
                active: selectedTab === MENUS.cate,
              })}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  <li>
                    <a className="mobile-cats-lead" href="#">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
    </>
  );
};

export default MenuMobile;
