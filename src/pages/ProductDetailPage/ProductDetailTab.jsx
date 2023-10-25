import React, { useState } from "react";
import cn from "../../utils/cn";
import { formatDate } from "../../utils/format";
import { transformToPercent } from "../../utils/transform";

const TABS = {
  desc: "Description",
  shipping: "Shipping & Returns",
  review: "Reviews",
};
const ProductDetailTab = ({ description, shippingReturn, reviews }) => {
  const [selectedTab, setSelectedTab] = useState("desc");

  const _onChangeTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };

  const tabs = Object.keys(TABS).map((key) => ({
    key,
    label: TABS[key],
  }));
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        {tabs?.map((tab) => (
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectedTab === tab.key,
              })}
              href={`#product-${tab.key}-tab`}
              onClick={(e) => _onChangeTab(e, tab.key)}
            >
              {tab.key === "review"
                ? reviews?.length
                  ? `Reviews (${reviews.length})`
                  : "Reviews(0)"
                : tab.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={cn("tab-pane fade", {
              "show active": selectedTab === tab.key,
            })}
            id={`product-${tab.key}-tab`}
          >
            <div className="product-desc-content">
              {tab.key === "desc" && (
                <>
                  <h3>Product Information</h3>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </>
              )}
              {tab.key === "shipping" && (
                <>
                  {shippingReturn && (
                    <div dangerouslySetInnerHTML={{ __html: shippingReturn }} />
                  )}
                </>
              )}
              {tab.key === "review" && (
                <div className="reviews">
                  <h3>{reviews?.length ? "Reviews" : "No any reviews"}</h3>
                  {reviews?.map((review) => {
                    const {
                      id,
                      rate,
                      order,
                      updatedAt,
                      description: reviewDesc,
                    } = review || {};
                    return (
                      <div className="review" key={id}>
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <h4>
                              <a href="#">@{order.slice(-4)}</a>
                            </h4>
                            <div className="ratings-container">
                              <div className="ratings">
                                <div
                                  className="ratings-val"
                                  style={{
                                    width: `${transformToPercent(rate)}`,
                                  }}
                                />
                              </div>
                            </div>
                            <span className="review-date">
                              {formatDate(updatedAt)}
                            </span>
                          </div>
                          <div className="col">
                            <h4>Good, perfect size</h4>
                            <div className="review-content">
                              <p>{reviewDesc}</p>
                            </div>
                            <div className="review-action">
                              <a href="#">
                                <i className="icon-thumbs-up" />
                                Helpful (2){" "}
                              </a>
                              <a href="#">
                                <i className="icon-thumbs-down" />
                                Unhelpful (0){" "}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailTab;
