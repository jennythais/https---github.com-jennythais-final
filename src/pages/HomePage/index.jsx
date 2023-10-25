import React from "react";
import BrandSection from "./BrandSection";
import DealsSection from "./DealSection";
import FeaturesSection from "./FeaturesSection";
import GetDealSection from "./GetDealSection";
import HotProductSection from "./HotProductSection";
import IntroSection from "./IntroSection";
import ServicesSection from "./ServicesSection";
import useHomePage from "./useHomePage";

const HomePape = () => {
  const {
    introProps,
    hotProps,
    dealProps,
    brandProps,
    featureProps,
    serviceProps,
    getDealProps,
  } = useHomePage();
  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProps} />
      <DealsSection {...dealProps} />
      <BrandSection {...brandProps} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturesSection {...featureProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServicesSection {...serviceProps} />
      <GetDealSection {...getDealProps} />
    </main>
  );
};

export default HomePape;
