import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ include updateCartItem & deleteCartItem directly for safer dependency
  const { cart, cartItems, updateCartItem, deleteCartItem } = useSelector(
    (store) => store.cart || {}
  );

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  // ✅ Fix: now re-fetches when cart item updated or deleted
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, updateCartItem, deleteCartItem]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-8 px-3 text-center py-10">
        <p className="text-lg text-gray-600">Your cart is empty</p>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Price Summary */}
        <div className="px-4 sticky top-0 h-fit mt-5 lg:mt-0">
          <div className="shadow rounded-lg p-5 bg-white">
            <p className="uppercase font-semibold text-sm opacity-70 pb-3">
              Price Details
            </p>
            <hr className="border-gray-200" />

            <div className="space-y-2 text-sm font-medium pt-3">
              <div className="flex justify-between text-gray-800">
                <span>Price ({cart?.totalItem || 0} items)</span>
                <span>₹{cart?.totalPrice || 0}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span>Discount</span>
                <span className="text-green-600">-₹{cart?.discount || 0}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total Amount</span>
                <span>₹{cart?.totalDiscountedPrice || 0}</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#6d28d9",
                fontSize: "0.85rem",
                padding: "6px 0",
                "&:hover": { backgroundColor: "#5b21b6" },
              }}
            >
              CHECK OUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
