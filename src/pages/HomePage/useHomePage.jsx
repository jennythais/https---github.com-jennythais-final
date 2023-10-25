import { useState } from "react";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import { productService } from "../../services/productService";
import useMutation from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../constants/message";
const useHomePage = () => {
  //API handling

  const { data: productsData } = useQuery(productService.getProduct);
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  const { data: categoriseData } = useQuery(productService.getCategories);

  const { data: servicesData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );

  const { execute: dealExecute } = useMutation(
    subscribeService.getSubscribesDeal
  );
  const handleSubscribeDeal = (email, callback) => {
    if (email) {
      dealExecute(email, {
        onSuccess: (data) => {
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail: (error) => {
          message.error(GENERAL_MESSAGE.error);
        },
      });
    }
  };
  //Get information
  const products = productsData?.products || [];
  const brands = homeData?.data?.brands || [];
  const categories = categoriseData?.products || [];
  const services = servicesData?.data?.information || [];
  //
  const featuredProducts = products?.filter((product) => product.featured);
  const onSaleProducts = products?.filter((product) => product.onSale);
  const topProducts = products?.filter((product) => product.topRated);
  const [selectedCateSlug, setSelectedCateSlug] = useState("all");
  const featuredProductsAll =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );

  //Intro
  const introProduct = featuredProducts.slice(0, 3);
  const introProps = {
    introProduct,
  };
  //Deal section
  const dealProducts = onSaleProducts.filter((product) => product.discount > 0);

  //Props
  const dealProps = {
    dealProducts,
  };
  const hotProps = {
    featuredProducts,
    onSaleProducts,
    topProducts,
  };
  const brandProps = {
    brands,
  };
  const featureProps = {
    categories: [{ name: "All", slug: "all" }, ...categories],
    featuredProductsAll,
    selectedCateSlug,
    handleSelectCate: (slug) => setSelectedCateSlug(slug),
  };
  const serviceProps = {
    services,
  };
  const getDealProps = {
    handleSubscribeDeal,
  };
  //Return
  return {
    introProps,
    hotProps,
    dealProps,
    brandProps,
    featureProps,
    serviceProps,
    getDealProps,
  };
};
export default useHomePage;
