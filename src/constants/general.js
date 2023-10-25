export const MODAL_TYPE = {
  login: "login",
  register: "register",
};
export const OPTIONS = {
  popularity: {
    value: "popularity",
    label: "Most popular",
    queryObj: { orderBy: undefined, order: undefined },
  },
  pricelow: {
    value: "pricelow",
    label: "Price Low to High",
    queryObj: { orderBy: "price", order: "1" },
  },
  pricehigh: {
    value: "pricehigh",
    label: "Price High to Low",
    queryObj: { orderBy: "price", order: "-1" },
  },
  newest: {
    value: "newest",
    label: "Newest",
    queryObj: { orderBy: "createdAt", order: "-1" },
  },
  mostrate: {
    value: "mostrate",
    label: "Most rated",
    queryObj: { orderBy: "rating", order: "-1" },
  },
};
