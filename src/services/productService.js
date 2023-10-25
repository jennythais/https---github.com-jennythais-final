import axiosIntance from "../utils/axiosInstance";

export const productService = {
  getProduct(query = "") {
    return axiosIntance.get(`/products${query}`);
  },
  getProductBySlug(slug = "") {
    return axiosIntance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosIntance.get(`/product-categories${query}`);
  },
  getCategoriesBySlug(slug = "") {
    return axiosIntance.get(`/product-categories/${slug}`);
  },
  getProductReview(id = "", query = "") {
    return axiosIntance.get(`/reviews/product/${id}`);
  },
};
