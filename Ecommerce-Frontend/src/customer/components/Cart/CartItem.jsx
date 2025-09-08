import React from "react";
import { Button, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CartItem = () => {
  return (
    <div className="p-5 shadow-lg border rounded-md">
      {/* Top row: Image + Product Details */}
      <div className="flex items-center">
        {/* Wrapper for image */}
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            src="https://rukminim1.flixcart.com/image/612/612/xif0q/jean/v/c/n/30-586035-v-mart-original-imagmh7fzah3r2jj.jpeg?q=70"
            alt="Product"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product details */}
        <div className="ml-5 space-y-1 flex-1">
          <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
          <p className="opacity-70">Size: L, White</p>
          <p className="opacity-70 mt-2">Seller: Crishtaliyo 2Fashion</p>

          <div className="flex space-x-5 items-center text-gray-900 pt-6">
            <p className="font-semibold">₹199</p>
            <p className="opacity-50 line-through">₹211</p>
            <p className="text-green-600 font-semibold">5% Off</p>
          </div>
        </div>
      </div>

      {/* Quantity + Remove button BELOW */}
      <div className="flex items-center gap-4 mt-4">
        {/* Quantity control */}
        <div className="flex items-center space-x-2">
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-4 border rounded-sm">33</span>
          <IconButton sx={{color:"RGB(145 85 253)"}}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>

        {/* Remove button (now right next to quantity controls) */}
        <Button sx={{color:"RGB(145 85 253)"}}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
