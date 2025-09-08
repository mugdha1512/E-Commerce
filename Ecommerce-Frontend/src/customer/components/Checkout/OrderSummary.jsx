import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem.jsx";   // ✅ Updated path
import { Button } from "@mui/material";

export const OrderSummary = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard />
      </div>

      <div className="max-w-5xl mx-auto mt-8 px-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left side: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 1, 1, 1].map((item, i) => (
              <CartItem key={i} />
            ))}
          </div>

          {/* Right side: Price Details */}
          <div className="px-4 sticky top-0 h-fit mt-5 lg:mt-0">
            <div className="shadow rounded-lg p-5 bg-white">
              <p className="uppercase font-semibold text-sm opacity-70 pb-3">
                Price Details
              </p>
              <hr className="border-gray-200" />

              <div className="space-y-2 text-sm font-medium pt-3">
                <div className="flex justify-between text-gray-800">
                  <span>Price</span>
                  <span>₹4697</span>
                </div>

                <div className="flex justify-between text-gray-800">
                  <span>Discount</span>
                  <span className="text-green-600">-₹3419</span>
                </div>

                <div className="flex justify-between text-gray-800">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-3">
                  <span>Total Amount</span>
                  <span>₹1278</span>
                </div>
              </div>

              <Button
                variant="contained"
                size="small"
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
    </div>
  );
};
