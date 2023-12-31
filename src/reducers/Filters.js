import {
  SET_PRODUCTS_ON_FILTER,
  SWITCH_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  RESET_FILTERS,
} from "../utils/Constants";

const filterInitialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    search: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    free_shipping: false,
  },
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS_ON_FILTER:
      let maxPrice = action.payload.map((item) => item.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };
    case SWITCH_VIEW:
      if (action.payload === "grid") {
        return { ...state, grid_view: true };
      } else {
        return { ...state, grid_view: false };
      }
    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case FILTER_PRODUCTS:
      const products = state.all_products;
      const { search, category, company, color, price, free_shipping } =
        state.filters;
      let tempProducts = [...products];

      if (search) {
        tempProducts = tempProducts.filter((prod) => {
          return prod.name.toLowerCase().startsWith(search);
        });
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.category === category;
        });
      }

      if (company !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.company === company;
        });
      }

      if (color !== "all") {
        tempProducts = tempProducts.filter((prod) => {
          return prod.colors.includes(color);
        });
      }
      if (price) {
        tempProducts = tempProducts.filter((prod) => {
          return prod.price <= price;
        });
      }

      if (free_shipping) {
        tempProducts = tempProducts.filter((prod) => {
          return prod.free_shipping === free_shipping;
        });
      }

      return { ...state, filtered_products: tempProducts };
    case SORT_PRODUCTS:
      let tempFilteredProducts = [];
      switch (state.sort) {
        case "price-lowest":
          tempFilteredProducts = state.filtered_products.sort(
            (a, b) => a.price - b.price,
          );
          return { ...state, filtered_products: tempFilteredProducts };
        case "price-highest":
          tempFilteredProducts = state.filtered_products.sort(
            (a, b) => b.price - a.price,
          );
          return { ...state, filtered_products: tempFilteredProducts };
        case "name-az":
          tempFilteredProducts = state.filtered_products.sort((a, b) =>
            a.name.localeCompare(b.name),
          );
          return { ...state, filtered_products: tempFilteredProducts };
        case "name-za":
          tempFilteredProducts = state.filtered_products.sort((a, b) =>
            b.name.localeCompare(a.name),
          );
          return { ...state, filtered_products: tempFilteredProducts };
        default:
          return { ...state, filtered_products: tempFilteredProducts };
      }

    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          search: "",
          company: "all",
          category: "all",
          color: "all",
          min_price: 0,
          max_price: state.filters.max_price,
          price: state.filters.max_price,
          free_shipping: false,
        },
      };
    default:
      return state;
  }
};

export { filterReducer, filterInitialState };
