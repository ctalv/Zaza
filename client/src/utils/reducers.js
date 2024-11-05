import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_SUBCATEGORIES,
  UPDATE_CURRENT_SUBCATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_FAVORITES
} from "./action";

export const reducer = (state, action) => {
  switch (action.type) {
    // updates list of products in the state with the products in the action
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
      // adds a single product to the cart
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
      // adds multiple products to the cart
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...action.products],
      };
      // updates cart quantity of a specific products
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => {
            // finds product with matching _id and updates its purchaseQuantity property
          if (action._id === product._id) {
            return {
              ...product,
              purchaseQuantity: action.purchaseQuantity
            };
          }
          return product
        })
      };
      // removes product from cart based on _id
    case REMOVE_FROM_CART:
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };
      // clears the cart
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };
      // shows or hides cart
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };
      // updates category list in the state with categories in action
    case UPDATE_SUBCATEGORIES:
      return {
        ...state,
        subcategories: [...action.subcategories],
      };
      // updates
    case UPDATE_CURRENT_SUBCATEGORY:
      return {
        ...state,
        currentSubCategory: action.currentSubcategory
      };
    

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
