import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
} from "./ActionType";
import { api } from "./../../config/apiConfig";

/* -------------------------------------------------------------
   FETCH ALL PRODUCTS (unchanged – only tiny comment added)
   ------------------------------------------------------------- */
export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/products?color=${colors || ""}&size=${sizes || ""}` +
      `&minPrice=${minPrice || 0}&maxPrice=${maxPrice || 10000}` +
      `&minDiscount=${minDiscount || 0}&category=${category || ""}` +
      `&stock=${stock || ""}&sort=${sort || ""}` +
      `&pageNumber=${pageNumber || 0}&pageSize=${pageSize || 10}`
    );

    console.log("Product data fetched:", data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("API error:", error);
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

/* -------------------------------------------------------------
   FETCH SINGLE PRODUCT BY ID – **THIS IS THE ONLY CHANGE**
   -------------------------------------------------------------
   • The thunk now receives the **raw productId string** (not an object).
   • It validates the ID before hitting the API.
   • URL is built with the real ID.
   ------------------------------------------------------------- */
export const findProductById = (productId) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  // ---- Defensive guard -------------------------------------------------
  if (!productId) {
    const msg = "Product ID is missing – cannot fetch product.";
    console.warn(msg);
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: msg });
    return;
  }

  console.log("product id", productId);   // <-- your existing log

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);

    console.log("Product by ID fetched:", data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    console.error("API error:", error);
    dispatch({
      type: FIND_PRODUCT_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};