import {
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

const initialState = {
  cart: null,              // full cart object
  cartItems: [],           // array of cart items
  loading: false,
  error: null,
  updateCartItem: null,    // ✅ added to trigger UI update
  deleteCartItem: null,    // ✅ added to trigger UI update
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    /* ---------------- ADD TO CART ---------------- */
    case ADD_ITEM_TO_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        loading: false,
      };

    case ADD_ITEM_TO_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ---------------- GET CART ---------------- */
    case GET_CART_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        cartItems: action.payload.cartItems || [],
        loading: false,
      };

    case GET_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ---------------- UPDATE CART ITEM ---------------- */
    case UPDATE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        updateCartItem: action.payload, // ✅ updated for dependency trigger
        loading: false,
      };

    case UPDATE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ---------------- REMOVE CART ITEM ---------------- */
    case REMOVE_CART_ITEM_REQUEST:
      return { ...state, loading: true, error: null };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
        deleteCartItem: action.payload, // ✅ correct key name
        loading: false,
      };

    case REMOVE_CART_ITEM_FAILURE:
      return { ...state, loading: false, error: action.payload };

    /* ---------------- DEFAULT ---------------- */
    default:
      return state;
  }
};
