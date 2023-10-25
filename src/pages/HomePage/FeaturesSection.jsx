import React from "react";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import cn from "../../utils/cn";
import owlCarousels from "../../utils/owlCarousels";

const FeaturesSection = ({
  categories,
  featuredProductsAll,
  selectedCateSlug,
  handleSelectCate,
}) => {
  useEffect(() => {
    owlCarousels;
  }, [selectedCateSlug]);
  const _onSelectCate = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelectCate?.("");
    setTimeout(() => {
      handleSelectCate?.(slug);
    }, 300);
  };
  return (
    <div className="container top">
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.map((category) => {
              const { name, slug } = category || {};
              return (
                <li className="nav-item">
                  <a
                    className={cn("nav-link", {
                      active: selectedCateSlug === slug,
                    })}
                    href="#top-all-tab"
                    onClick={(e) => _onSelectCate(e, slug)}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className={cn("tab-pane p-0 fade", {
            "show active": featuredProductsAll?.length > 0,
          })}
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
        >
          {featuredProductsAll?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": false,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "480": {
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
              {featuredProductsAll?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
