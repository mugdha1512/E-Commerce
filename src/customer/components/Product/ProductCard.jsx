import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product?.id}`)}
      className="productCard w-[15rem] m-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
      style={{ padding: "0.75rem", boxSizing: "border-box" }}
    >
      {/* Product Image */}
      <div className="h-[20rem] overflow-hidden rounded-md">
        <img
          className="h-full w-full object-cover rounded-md"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      {/* Product Info Section */}
      <div className="textPart p-3 space-y-2">
        {/* Brand Name */}
        <p className="text-sm font-semibold text-gray-500">{product.brand}</p>

        {/* Product Title */}
        <h3 className="text-base font-medium line-clamp-2">{product.title}</h3>

        {/* Price Section */}
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold">₹{product.discountedPrice}</p>
          <p className="text-sm line-through text-gray-400">₹{product.price}</p>
          <p className="text-sm text-green-600 font-semibold">
            {product.discountPersent}% Off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
