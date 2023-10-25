import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import queryString from "query-string";
import { useMemo } from "react";
import { OPTIONS } from "../../constants/general";
import useMutation from "../../hooks/useMutation";

//useLocation: current url
//phan chuoi: parse
//stringify: obj -> string
//const queryObj = {
//   page: 2,
//   category: "electronics",
// };
// -> "page=2&category=electronics".
const PRODUCT_LIMIT = 9;
const useProductPage = () => {
  //* Lay query tu URL -> save vao queryObj
  const { search } = useLocation();
  const queryObj = queryString.parse(search);
  const [_, setSearchParams] = useSearchParams();
  //* API Product
  const {
    data: productData,
    loading: productLoading,
    error: productError,
    execute: productRefetch,
  } = useMutation((query) =>
    productService.getProduct(query || `?limit=${PRODUCT_LIMIT}`)
  );
  const products = productData?.products || [];
  const productPagi = productData?.pagination || {};
  //* API Category
  const {
    data: cateData,
    loading: cateLoading,
    error: cateError,
  } = useQuery(productService.getCategories);
  const cate = cateData?.products || [];

  //* REFETCH & UPDATE
  useEffect(() => {
    productRefetch(search);
  }, [search]);

  const updateQueryString = (queryObj) => {
    const newQueryString = queryString.stringify({
      ...queryObj,
      limit: PRODUCT_LIMIT,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  //* Props
  const productListProps = {
    isLoading: productLoading,
    isError: !!productError,
    products,
  };

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObj, page: page });
  };

  const paginationProps = {
    page: Number(productPagi.page || queryObj.page || 1),
    limit: Number(productPagi.limit || 0),
    total: Number(productPagi.total || 0),
    onPagiChange,
  };

  const activeSort = useMemo(() => {
    return (
      Object.values(OPTIONS).find(
        (option) =>
          option.queryObj.orderBy === queryObj.orderBy &&
          option.queryObj.order === queryObj.order
      )?.value || OPTIONS.popularity.value
    );
  }, [queryObj]);

  const onSortChange = (valueOptionSort) => {
    const sortQueryObj = OPTIONS[valueOptionSort].queryObj;
    if (sortQueryObj) {
      updateQueryString({
        ...queryObj,
        ...sortQueryObj,
        page: 1,
      });
    }
  };

  const toolboxProps = {
    showNumber: products?.length || 0,
    totalNumber: productPagi.total || 0,
    activeSort,
    onSortChange,
  };

  const maxPriceDefault = 1000;
  const onCateFilterChange = (cateId, isChecked) => {
    let newCategoriesFilter = Array.isArray(queryObj.category)
      ? [...queryObj.category, cateId]
      : [queryObj.category, cateId];
    if (!isChecked) {
      newCategoriesFilter = newCategoriesFilter.filter(
        (category) => category !== cateId
      );
    }
    updateQueryString({ ...queryObj, category: newCategoriesFilter, page: 1 });
  };

  const handlePriceFilterChange = (values) => {
    if (values?.length === 2) {
    }
    updateQueryString({
      ...queryObj,
      minPrice: values[0],
      maxPrice: values[1],
      page: 1,
    });
  };

  const filterProps = {
    categories: cate || [],
    isLoading: cateLoading,
    isError: cateError,
    activeCate: Array.isArray(queryObj.category)
      ? queryObj.category
      : [queryObj.category],
    currentPriceRange: [
      queryObj.minPrice || 0,
      queryObj.maxPrice || maxPriceDefault,
    ],
    onCateFilterChange,
    handlePriceFilterChange,
  };

  return {
    productListProps,
    paginationProps,
    toolboxProps,
    filterProps,
  };
};

export default useProductPage;
