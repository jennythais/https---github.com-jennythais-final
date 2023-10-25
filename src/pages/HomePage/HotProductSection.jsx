import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import owlCarousels from "../../utils/owlCarousels";
import cn from "../../utils/cn";
import ProductCard from "../../components/ProductCard";

const TABS = {
  feature: "Featured",
  on_sale: "On Sale",
  top_rate: "Top Rated",
};
const HotProductSection = ({
  featuredProducts,
  onSaleProducts,
  topProducts,
}) => {
  const [selectedTab, setSelectedTab] = useState(TABS.feature);
  const _onChangeTab = (e, tab) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTab("");
    setTimeout(() => {
      setSelectedTab(tab);
    }, 300);
  };
  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.feature:
        return featuredProducts;
      case TABS.on_sale:
        return onSaleProducts;
      case TABS.top_rate:
        return topProducts;
      default:
        return [];
    }
  };
  const renderProducts = _getSelectedProducts(selectedTab);
  useEffect(() => {
    owlCarousels();
  }, [selectedTab, featuredProducts, onSaleProducts, topProducts]);

  return (
    <>
      <div className="container featured">
        <ul
          className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectedTab === TABS.feature,
              })}
              href="#products-featured-tab"
              onClick={(e) => _onChangeTab(e, TABS.feature)}
            >
              Featured
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectedTab === TABS.on_sale,
              })}
              href="#products-sale-tab"
              onClick={(e) => _onChangeTab(e, TABS.on_sale)}
            >
              On Sale
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link", {
                active: selectedTab === TABS.top_rate,
              })}
              href="#products-top-tab"
              onClick={(e) => _onChangeTab(e, TABS.top_rate)}
            >
              Top Rated
            </a>
          </li>
        </ul>
        <div className="tab-content tab-content-carousel">
          <div
            className={cn("tab-pane p-0 fade", {
              "show active": renderProducts?.length > 0,
            })}
            role="tabpanel"
          >
            {renderProducts?.length > 0 && (
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                                                      "nav": true, 
                                                      "dots": true,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "600": {
                                                              "items":2
                                                          },
                                                          "992": {
                                                              "items":3
                                                          },
                                                          "1200": {
                                                              "items":4
                                                          }
                                                      }
                                                  }'
              >
                {renderProducts?.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mb-7 mb-lg-11" />
    </>
  );
};

export default HotProductSection;
