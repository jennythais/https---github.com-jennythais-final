import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MODAL_TYPE } from "../../constants/general";
import { PATHS } from "../../constants/path";
import {
  handleLogout,
  handleShowModal
} from "../../store/reducers/authReducer";
import tokenMethod from "../../utils/token";

const HeaderTop = () => {
  //Dispatch
  const dispatch = useDispatch();
  //Navigate
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const { firstName, email } = profile || {};
  //Handle SHOW MODAL
  const _showAuthModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(MODAL_TYPE.login));
  };
  //Handle LOG OUT
  const _onSignOut = (e) => {
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod.get() ? (
            <>
              {/* Not LogIn */}
              <ul className="top-menu top-link-menu">
                <li>
                  <a
                    href="#signin-modal"
                    className="top-menu-login"
                    onClick={_showAuthModal}
                  >
                    <i className="icon-user" />
                    Login | Resgister{" "}
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Logged In */}
              <ul class="top-menu">
                <li>
                  <a href="#" class="top-link-menu">
                    <i class="icon-user"></i>
                    {firstName || email || "Guest"}
                    {""}
                  </a>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <a href={PATHS.DASHBOARD}>Account Details</a>
                        </li>
                        <li>
                          <a href={PATHS.DASHBOARD}>Your Orders</a>
                        </li>
                        <li>
                          <a href={PATHS.DASHBOARD}>
                            Wishlist <span>(3)</span>
                          </a>
                        </li>
                        <li>
                          <a href={PATHS.HOME} onClick={_onSignOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
