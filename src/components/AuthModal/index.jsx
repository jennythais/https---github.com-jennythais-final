import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MODAL_TYPE } from "../../constants/general";
import {
  handleCloseModal,
  handleShowModal,
} from "../../store/reducers/authReducer";
import cn from "../../utils/cn";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthenModalContainer = styled.div`
  display: ${(props) => (props?.isShow ? "block" : "none")};
`;
const AuthModal = () => {
  const dispatch = useDispatch();
  const { showedModal } = useSelector((state) => state.auth);
  const _onChangeTab = (e, tab) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(tab));
  };

  const _onCloseModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleCloseModal());
  };
  return (
    <>
      <AuthenModalContainer
        className={cn("modal", { "fade show": !!showedModal })}
        isShow={!!showedModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" onClick={_onCloseModal}>
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill nav-border-anim">
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPE.login,
                        })}
                        href="#signin"
                        onClick={(e) => _onChangeTab(e, MODAL_TYPE.login)}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPE.register,
                        })}
                        href="#register"
                        onClick={(e) => _onChangeTab(e, MODAL_TYPE.register)}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div
                      className={cn("tab-pane fade", {
                        show: showedModal === MODAL_TYPE.login,
                        active: showedModal === MODAL_TYPE.login,
                      })}
                    >
                      {showedModal === MODAL_TYPE.login && <LoginForm />}
                    </div>
                    {/* .End .tab-pane */}
                    <div
                      className={cn("tab-pane fade", {
                        show: showedModal === MODAL_TYPE.register,
                        active: showedModal === MODAL_TYPE.register,
                      })}
                    >
                      {showedModal === MODAL_TYPE.register && <RegisterForm />}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {!!showedModal && (
          <div
            className="modal-backdrop fade show"
            onClick={_onCloseModal}
            style={{ zIndex: -1 }}
          ></div>
        )}
      </AuthenModalContainer>
    </>
  );
};

export default AuthModal;
