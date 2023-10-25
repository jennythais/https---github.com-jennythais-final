import React from "react";
import MyAccount from "./MyAccount";
import MyOrder from "./MyOrder";
import MyWishlist from "./MyWishlist";
import MyAddress from "./MyAddress";
import { useAuthContext } from "../../context/AuthContext";
import { PATHS } from "../../constants/path";
import cn from "../../utils/cn";
import { useState } from "react";

const TABS = {
  acc: "Account",
  order: "Orders",
  add: "Addresses",
  wlist: "Wishlist",
};
const DashBoardPage = () => {
  const { profile, handleLogout } = useAuthContext();
  const _onSignOut = (e) => {
    e?.preventDefault;
    handleLogout();
  };
  const [selectedTab, setSelectedTab] = useState("acc");
  const _onChangeTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  const tabs = Object.keys(TABS).map((key) => ({
    key,
    label: TABS[key],
  }));

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Account
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <aside className="col-md-4 col-lg-3">
                <ul
                  className="nav nav-dashboard flex-column mb-3 mb-md-0"
                  role="tablist"
                >
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.key}>
                      <a
                        className={cn("nav-link", {
                          active: selectedTab === tab.key,
                        })}
                        href={`#tab-${tab.key}`}
                        onClick={(e) => _onChangeTab(e, tab.key)}
                      >
                        {tab.label}
                      </a>
                    </li>
                  ))}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href={PATHS.HOME}
                      onClick={_onSignOut}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </aside>
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  {tabs.map((tab) => (
                    <div
                      key={tab.key}
                      className={cn("tab-pane fade", {
                        show: selectedTab === tab.key,
                        active: selectedTab === tab.key,
                      })}
                    >
                      {tab.key === "acc" && <MyAccount />}
                      {tab.key === "order" && <MyOrder />}
                      {tab.key === "add" && <MyAddress />}
                      {tab.key === "wlist" && <MyWishlist />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardPage;
