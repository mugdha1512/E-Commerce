import React from 'react';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';  // <<< Add this import

const OrderCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${5}`)}
      className="flex flex-row flex-wrap gap-4 ml-10 mt-5 p-5 shadow-md hover:shadow-2xl cursor-pointer"
    >
      {/* Card: Image + details side by side */}
      <div className="flex w-1/2">
        <img
          className="w-[5rem] h-[5rem] object-cover object-top"
          src="https://rukminim1.flixcart.com/image/612/612/xif0q/jean/d/s/c/36-mj-bk-pl-48-comfits-original-imagqbrnyjfzhs8v.jpeg?q=70"
          alt=""
        />
        <div className="ml-5 flex flex-col justify-center">
          <p className="space-y-2">Men Slim Mid Rise Black Jeans</p>
          <p className="opacity-50 text-xs font-semibold">Size: M</p>
          <p className="opacity-50 text-xs font-semibold">Color: Black</p>
        </div>
      </div>

      <div className="flex items-center">
        <p>₹1099</p>
      </div>

      <div className='ml-15 flex flex-col justify-center'>
        {true && (
          <div>
            <p className="flex items-center">
              <AdjustIcon sx={{ width: "15px", height: "15px" }} className="text-green-600 mr-2" />
              <span>Delivered On March 03</span>
            </p>
            <p className="text-xs">Your Item Has Been Delivered</p>
          </div>
        )}

        {/* If you want to conditionally show expected delivery */}
        {false && (
          <p>
            <span>Expected Delivery On March 03</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
