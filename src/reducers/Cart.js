import {
  ADD_TO_CART,
  TOGGLE_ITEM_AMOUNT,
  REMOVE_ITEM,
  CLEAR_CART,
  CALCULATE_TOTAL,
} from "../utils/Constants";

const getLocalStorageData = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return [];
};
const cartInitialState = {
  cart: getLocalStorageData(),
  total_items: 0,
  total_price: 0,
  shipping_fee: 11,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, productDetails, amount, defaultColor } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id + defaultColor);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + defaultColor) {
            let newAmount = cartItem.amount + amount;
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + defaultColor,
          name: productDetails.name,
          color: defaultColor,
          amount,
          image: productDetails.image,
          price: productDetails.price,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case TOGGLE_ITEM_AMOUNT:
      const cartItems = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          return { ...cartItem, amount: action.payload.amount };
        }
        return cartItem;
      });

      return { ...state, cart: [...cartItems] };
    case REMOVE_ITEM:
      const cartAfterRemovingItem = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload,
      );
      return { ...state, cart: [...cartAfterRemovingItem] };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case CALCULATE_TOTAL:
      const { total_items, total_price } = state.cart.reduce(
        (total, cartItem) => {
          total.total_items += cartItem.amount;
          total.total_price += cartItem.price * cartItem.amount;
          return total;
        },
        {
          total_items: 0,
          total_price: 0,
        },
      );
      return { ...state, total_price: total_price, total_items: total_items };

    default:
      return state;
  }
};

export { cartReducer, cartInitialState };
