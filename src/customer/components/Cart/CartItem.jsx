import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";
import { updateCartItem, removeCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (value) => {
    if (value < 1) return;
    const data = { cartItemId: item.id, quantity: value };
    dispatch(updateCartItem(data));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md bg-white">
      <div className="flex items-start gap-5">
        {/* Image */}
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] flex-shrink-0">
          <img
            src={item.product?.imageUrl || "https://via.placeholder.com/150"}
            alt={item.product?.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-base">{item.product?.title}</p>
          <p className="opacity-70 text-sm">Size: {item.size}</p>
          <p className="opacity-70 text-sm">Seller: {item.product?.brand}</p>

          <div className="flex items-center gap-3 pt-3 text-sm">
            <p className="font-semibold">₹{item.discountedPrice}</p>
            {item.price > item.discountedPrice && (
              <p className="opacity-50 line-through">₹{item.price}</p>
            )}
            {item.product?.discountPercent > 0 && (
              <p className="text-green-600 font-semibold">
                {item.product.discountPercent}% Off
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quantity + Remove */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2">
          <IconButton
            size="small"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="w-10 py-1 text-center border rounded-sm text-sm">
            {item.quantity}
          </span>
          <IconButton
            size="small"
            sx={{ color: "rgb(145, 85, 253)" }}
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        <Button
          onClick={handleRemove}
          sx={{ color: "rgb(145, 85, 253)", fontSize: "0.875rem" }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;